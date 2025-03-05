
import express from "express";

const app = express();

app.all('*', async (_, res) => {
    res.send('hello world')
})

app.listen(process.env.PORT)
