"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
exports.db = (0, better_sqlite3_1.drizzle)(process.env.DB_FILE);
