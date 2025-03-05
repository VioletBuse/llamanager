"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const worker_1 = require("./worker");
const api_1 = require("./api");
const manager_1 = require("./manager");
if (process.env.FLY_PROCESS_GROUP === "worker") {
    (0, worker_1.run_worker)();
}
else if (process.env.FLY_PROCESS_GROUP === "api") {
    (0, api_1.run_api)();
}
else if (process.env.FLY_PROCESS_GROUP === "manager") {
    (0, manager_1.run_manager)();
}
else {
    console.error("No recognized process group found, exiting");
    process.exit(1);
}
