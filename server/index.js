import express from 'express'
import { generate, trimAndParseJson } from './src/utils/functions.js';

const app = express()
const port = 3000


app.get('/generate', async (req, res) => {
    let data = await generate();
    console.log(data.candidates[0].content.parts[0].text)
    let jsonData = await trimAndParseJson(data.candidates[0].content.parts[0].text)
    if(jsonData) {
        res.send(jsonData)
    } else {
        res.send("Error");
    }
})

app.get('/index', (req, res) => {
    res.send("Welcome to my Website")
    console.log("Welcome to my Website")
})

app.listen(port, () => {
    console.log("Server Started at Port ", port)
})