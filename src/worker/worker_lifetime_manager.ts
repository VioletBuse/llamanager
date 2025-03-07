import { setInterval } from "node:timers";

export class WorkerLifetimeManager {
    static #instance: WorkerLifetimeManager;
    private last_request_time: Date;
    private max_idle_seconds: number = 20;
    private is_processing_query: boolean;

    private worker_boot_time: Date;
    private max_lifetime_seconds: number = 10 * 60

    private constructor() {
        this.worker_boot_time = new Date();
        this.last_request_time = new Date();
        this.is_processing_query = false;
        /// check if the worker should shutdown every ten seconds
        setInterval(this.evaluate_lifetime_state, 10_1000)
    }

    private evaluate_lifetime_state() {
        const current_time = Date.now();

        const boot_time = this.worker_boot_time.getTime();
        const max_lifetime = this.max_lifetime_seconds * 1000;

        if (boot_time + max_lifetime < current_time) {
            console.log(`Max worker lifetime of ${this.max_lifetime_seconds} exceeded, shutting down`)
            process.exit(0)
        }

        if (this.is_processing_query) {
            return;
        }

        const last_activity_time = this.last_request_time.getTime();

        const max_idle_time = this.max_idle_seconds * 1000;

        if (last_activity_time + max_idle_time < current_time) {
            console.log(`Worker has been idle for ${this.max_idle_seconds} seconds, exiting`)
            process.exit(0)
        }
    }

    public static get instance(): WorkerLifetimeManager {
        if (!WorkerLifetimeManager.#instance) {
            WorkerLifetimeManager.#instance = new WorkerLifetimeManager();
        }

        return WorkerLifetimeManager.#instance
    }

    public log_request() {
        this.last_request_time = new Date();
    }
}
