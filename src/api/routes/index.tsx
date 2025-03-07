import express from "express"

const app = express()

app.all('*', async (req, res) => {
    const htmlstr: string = await (
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
