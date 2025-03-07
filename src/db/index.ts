
import Database from 'better-sqlite3'
import {drizzle} from 'drizzle-orm/better-sqlite3'

const db_filename = process.env.DB_FILE!

const sqlite = new Database(db_filename)
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite)


