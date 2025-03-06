import "dotenv/config"
import { run_manager } from "./manager/index.js"
import { run_api } from "./api/index.js"
import { run_worker } from "./worker/index.js"

if (process.env.FLY_PROCESS_GROUP! === "manager") {
    run_manager()
} else if (process.env.FLY_PROCESS_GROUP! === "api") {
    run_api()
} else if (process.env.FLY_PROCESS_GROUP! === "worker") {
    run_worker()
} else {
    console.log(`Unknown process group: ${process.env.FLY_PROCESS_GROUP}, exiting`)
    process.exit(1)
}