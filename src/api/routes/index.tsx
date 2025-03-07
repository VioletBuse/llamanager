import bodyParser from "body-parser"
import express from "express"

const app = express()

app.use(bodyParser.json())

app.all('*', async (req, res) => {
    const htmlstr = await (
        <html>
            <body>
                <h1>Llamanager</h1>
            </body>
        </html>
    )

    res.setHeader('content-type', 'text/html')
    res.send(htmlstr)
})

export default app
