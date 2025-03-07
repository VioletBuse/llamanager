
import Database from 'better-sqlite3'
import {drizzle} from 'drizzle-orm/better-sqlite3'
import fs from "fs-extra"
import { URL } from 'node:url'

const db_filename = process.env.DB_FILE!

const sqlite = new Database(db_filename)
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite)

export const get_primary_id = async (): Promise<string> => {
    try {
        const data = await fs.readFile(`/litefs/.primary`, 'utf-8')
        if (data) {
            const url = new URL(data);
            const hostname = url.hostname;
            const machine_id = hostname.replace(`.vm.${process.env.FLY_APP_NAME}.internal`, "");

            return machine_id
        } else {
            return process.env.FLY_MACHINE_ID!
        }
    } catch (err) {
        return process.env.FLY_MACHINE_ID!
    }
}

export const get_primary_url = async (): Promise<string> => {
    const primary_id = await get_primary_id();

    if (primary_id === process.env.FLY_MACHINE_ID) {
        return `http://localhost:8080`
    }

    return `http://${primary_id}.vm.${process.env.FLY_APP_NAME!}.internal:8080`
}

