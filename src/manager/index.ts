import app from "./routes"

export const run_manager = async () => {
    app.listen(process.env.PORT!, () => {
        console.log(`llamanager manager listening on port ${process.env.PORT!}`)
    })
}
