import path from "node:path";
import { get_primary_id } from "../../db/index.js"
import shell from "shelljs"
import { nanoid } from "nanoid";
import { s3 } from "../../db/s3.js";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import fs from "fs-extra";
import { rm } from "node:fs/promises";

export const run_backup_manager = () => {
    const five_minutes = 5 * 60 * 1000;

    manage_backups().catch(err => {throw err}).then(() => {
        setTimeout(run_backup_manager, five_minutes)
    })
}

const manage_backups = async () => {
    const is_primary = (await get_primary_id()) === process.env.FLY_MACHINE_ID;

    if (!is_primary) {
        return
    }

    if (!shell.which('litefs')) {
        console.log(`node could not find litefs, exiting`)
        process.exit(1)
    }

    shell.cd('/litefs')
    const database_name = path.basename(process.env.DB_FILE!)
    const backup_local_path = `/volume/backup_staging/backup-${nanoid()}.db`
    console.log(`backup db ${database_name} to ${backup_local_path}`)
    const backup = shell.exec(`litefs export -name ${database_name} ${backup_local_path}`, async (code, stdout, stderr) => {
        if (code !== 0) {
            shell.rm('-f', backup_local_path)
            throw new Error(`Could not backup database ${database_name}.\n${stdout}\n${stderr}`);
        }

        const date = new Date()

        let s3_backup_name = "";
        s3_backup_name += date.getUTCDay().toPrecision(2);
        s3_backup_name += "t"
        s3_backup_name += date.getUTCHours().toPrecision(2);
        s3_backup_name += ":"

        const mins = date.getUTCMinutes();
        const five_min_increment = mins - (mins % 5);
        s3_backup_name += five_min_increment.toPrecision(2)

        const stream = fs.createReadStream(backup_local_path);

        const upload_command = new PutObjectCommand({
            Key: `Database_Backups/${s3_backup_name}.db`,
            Bucket: process.env.BUCKET_NAME!,
            Body: stream
        });

        try {
            await s3.send(upload_command);
            await rm(backup_local_path)
        } catch (err) {
            console.error(`error uploading backup to s3`)
            console.error(err)
            process.exit(1)
        }
    });
}
