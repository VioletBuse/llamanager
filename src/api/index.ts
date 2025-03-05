import  app  from "./routes/index.js"

export const run_api = async () => {
    app.listen(process.env.PORT!, () => {
        console.log(`llamanager api running on port ${process.env.PORT!}`)
    })
}
