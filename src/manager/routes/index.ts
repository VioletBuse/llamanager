import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express"
import { promises } from "node:dns";
import { get_primary_id } from "../../db/index.js";

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    const secret_token = req.headers['secret-token'];

    if (secret_token !== process.env.SECRET_TOKEN!) {
        res.send(null)
    } else {
        next()
    }
})

app.use(async (req, res, next) => {
    if (req.method === "GET") {
        next()
        return
    }

    const primary = await get_primary_id();

    if (!primary) {
        next();
        return
    }

    res.setHeader('fly-replay', `instance=${primary}`);
    res.send(null)
    return
})

app.all('*', async (req, res) => {
    res.send('hello from manager!')
})

export default app
