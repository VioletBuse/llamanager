import app from "./routes/index.js"
import { WorkerLifetimeManager } from "./worker_lifetime_manager.js"

export const run_worker = async () => {
    console.log("hello from worker")

    const lifetime_manager = WorkerLifetimeManager.instance;

    app.listen(process.env.INTERNAL_PORT!, () => {
        console.log(`Worker listening on port ${process.env.WORKER_PORT!}.`)
    })
}
