import express from 'express'
import { generate, trimAndParseJson } from './src/utils/functions.js';
import cors from "cors"
import { connectDB } from './src/config/dbConfig.js';
import User from './src/models/userSchema.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs";
import { verifyToken } from './src/middlewares/verifyToken.js';

dotenv.config({ path: '.env' })

const app = express()
const port = 3000
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY

connectDB()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

app.use(express.json());

app.post('/generate', async (req, res) => {
    let data = await generate(req.body);
    if (!data) return;
    console.log(data.candidates[0].content.parts[0].text)
    let jsonData = await trimAndParseJson(data.candidates[0].content.parts[0].text)
    if (jsonData) {
        res.send(jsonData)
    } else {
        res.send("Error");
    }
})

app.post('/user/create', async (req, res) => {
    if (req.body) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            age: req.body.age,
            currentClass: req.body.currentClass
        })

        const isUserAlreadyExist = await User.findOne({ email: req.body.email });

        if (!isUserAlreadyExist) {
            const savedUser = await user.save()

            const token = jwt.sign({
                id: savedUser._id, email: savedUser.email
            }, jwtPrivateKey, {
                expiresIn: 60,
            })

            res.status(201).json({ success: true, token, message: "Signed Up Successfully" })
        } else {
            console.log("User already exists")
            return res.status(201).json({ success: false, message: "User already exists!", });
        }
    }
})

app.post('/user/login', async (req, res) => {
    if (req.body) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
            if (isCorrectPassword) {
                const token = jwt.sign({
                    id: user._id, email: user.email
                }, jwtPrivateKey, {
                    expiresIn: 60,
                })
                res.status(201).json({ success: true, token, message: "Logged in successfully" })
            } else {
                res.status(403).json({ success: false, message: "Wrong Password" })
            }
        } else {
            res.status(403).json({ success: false, message: "Please Signup to continue" })
        }
    }
})

app.get('/user/details', verifyToken, async (req, res) => {
    if (req.user) {
        let { firstName, lastName, email } = await User.findById(req.user.id);
        let userDetails = { firstName, lastName, email }
        res.status(201).json({ success: true, user: userDetails, message: "User Details Fetched Successfully" })
    } else {
        res.status(201).json({ success: false, message: "Unable to get user details" })
    }
})

app.listen(port, () => {
    console.log("Server Started at Port ", port)
})