var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "node:path";
import { db } from "../db/index.js";
import app from "./routes/index.js";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
export const run_manager = () => __awaiter(void 0, void 0, void 0, function* () {
    yield migrate(db, {
        migrationsFolder: path.resolve(process.cwd(), "./drizzle")
    });
    app.listen(process.env.PORT, () => {
        console.log(`llamanager manager listening on port ${process.env.PORT}`);
    });
});
