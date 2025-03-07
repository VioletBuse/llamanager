import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const api_keys = sqliteTable('api_keys', {
    id: text('id').primaryKey()
})
