import "dotenv/config"

import { run_worker } from "./worker"
import { run_api } from "./api"
import { run_manager } from "./manager"

if (process.env.FLY_PROCESS_GROUP === "worker") {
    run_worker()
} else if (process.env.FLY_PROCESS_GROUP === "api") {
    run_api()
} else if (process.env.FLY_PROCESS_GROUP === "manager") {
    run_manager()
} else {
    console.error("No recognized process group found, exiting");
    process.exit(1)
}

