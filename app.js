const express = require(`express`)
require(`dotenv`).config()

const hostname = process.env.host
const port = process.env.port

const api = express()

api.use(express.json())
api.use(`/people`, require(`./people`))

if (process.env.NODE_ENV !== `test`) {
    api.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))
}

module.exports = api
