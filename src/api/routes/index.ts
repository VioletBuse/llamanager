import express from "express"

const app = express()

app.all('*', async (req, res) => {
    res.send('hello from api!')
})

export default app
