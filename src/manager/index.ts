import path from "node:path";
import { db } from "../db"
import app from "./routes"
import {migrate} from "drizzle-orm/better-sqlite3/migrator"

export const run_manager = async () => {

    await migrate(db, {
        migrationsFolder: path.join(__dirname, "..", "drizzle")
    });

    app.listen(process.env.PORT!, () => {
        console.log(`llamanager manager listening on port ${process.env.PORT!}`)
    })
}
