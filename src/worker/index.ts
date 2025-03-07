import app from "./routes/index.js"

export const run_worker = async () => {
    console.log("hello from worker")
    process.exit(0)
}
