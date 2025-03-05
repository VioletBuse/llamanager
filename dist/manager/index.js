"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run_manager = void 0;
const node_path_1 = __importDefault(require("node:path"));
const db_1 = require("../db");
const routes_1 = __importDefault(require("./routes"));
const migrator_1 = require("drizzle-orm/better-sqlite3/migrator");
const run_manager = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, migrator_1.migrate)(db_1.db, {
        migrationsFolder: node_path_1.default.join(__dirname, "..", "drizzle")
    });
    routes_1.default.listen(process.env.PORT, () => {
        console.log(`llamanager manager listening on port ${process.env.PORT}`);
    });
});
exports.run_manager = run_manager;
