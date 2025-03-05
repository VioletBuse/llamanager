import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const queries = sqliteTable("queries", {
    id: int('id').primaryKey()
})
