"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.queries = (0, sqlite_core_1.sqliteTable)("queries", {
    id: (0, sqlite_core_1.int)('id').primaryKey()
});
