import path from "node:path";
import { db } from "../db/index.js"
import app from "./routes/index.js"
import {migrate} from "drizzle-orm/better-sqlite3/migrator"
import { run_worker_manager } from "./background/worker.js";
import { run_backup_manager } from "./background/backups.js";

export const run_manager = async () => {

    const migrations_dir = path.resolve(process.cwd(), "./drizzle")
    console.log(`migrations folder: ${migrations_dir}`)

    await migrate(db, {
        migrationsFolder: migrations_dir
    });

    app.listen(process.env.INTERNAL_PORT!, () => {
        console.log(`llamanager manager listening on port ${process.env.INTERNAL_PORT!}`)
    })

    run_worker_manager();
    run_backup_manager();
}
