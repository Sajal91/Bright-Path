import express from 'express'
import { generate, trimAndParseJson } from './src/utils/functions.js';
import cors from "cors"

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    })
);

app.post('/generate', async (req, res) => {
    // let data = await generate();
    // console.log(data.candidates[0].content.parts[0].text)
    // let jsonData = await trimAndParseJson(data.candidates[0].content.parts[0].text)
    // if(jsonData) {
    //     res.send(jsonData)
    // } else {
    //     res.send("Error");
    // }
    console.log(req.body)
})

app.get('/index', (req, res) => {
    res.send("Welcome to my Website")
    console.log("Welcome to my Website")
})

app.listen(port, () => {
    console.log("Server Started at Port ", port)
})