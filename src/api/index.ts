import  app  from "./routes/index.js"

export const run_api = async () => {
    app.listen(process.env.INTERNAL_PORT!, () => {
        console.log(`llamanager api running on port ${process.env.INTERNAL_PORT!}`)
    })
}
