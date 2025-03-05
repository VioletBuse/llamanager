import path from "node:path";
import { db } from "../db/index.js"
import app from "./routes/index.js"
import {migrate} from "drizzle-orm/better-sqlite3/migrator"

export const run_manager = async () => {

    await migrate(db, {
        migrationsFolder: path.resolve(process.cwd(), "./drizzle")
    });

    app.listen(process.env.PORT!, () => {
        console.log(`llamanager manager listening on port ${process.env.PORT!}`)
    })
}
