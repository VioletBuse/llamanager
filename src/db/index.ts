
import Database from 'better-sqlite3'
import {drizzle} from 'drizzle-orm/better-sqlite3'

const is_worker = process.env.FLY_PROCESS_GROUP! === "worker"
const db_filename = process.env.DB_FILE!

const sqlite = new Database(is_worker ? ":memory:" : db_filename)

export const db = drizzle(sqlite)


