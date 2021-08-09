import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import axios from 'axios'
import crypto from 'crypto'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('common'))
app.use(cors({ allowedHeaders: [
    "file:///" // TMP:
] }))

const host = '0.0.0.0'
const port = 8080

function generateToken(length: number) {
    return crypto.randomBytes(length).toString('base64').substr(0, length)
}

app.post('/trusted', async (req, res) => {
    const token = `${generateToken(24)}==:${generateToken(24)}`
    res.json(token)
})

app.get('/', async (req, res) => {
    const contents = fs.readFileSync('src/index.html')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(contents)
})

app.post('/api', async (req, res) => {
    let site = null
    const body = req.body
    const url = new URL(body.share_link)
    if (url.pathname.startsWith('/t/')) {
        let tokens = url.pathname.split('/')
        site = tokens[2]
    }
    
    const tabServer = `${url.protocol}//${url.hostname}`
    const tabUrl = new URL(tabServer + '/trusted')
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

    const result = await axios.post(`http://${tabUrl.hostname}:${port}/trusted`, { headers })
    const ticket = result.data
    res.json({ ticket })
})

app.listen(port, host, () => console.log(`> Server is running on port ${port}`))