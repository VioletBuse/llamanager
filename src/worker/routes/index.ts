import express from "express"

const app = express();

app.all('*', async (req, res) => {
    res.send('Hello from worker!')
})

export default app
