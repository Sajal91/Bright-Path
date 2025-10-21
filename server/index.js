import express from 'express'
import { generate, trimAndParseJson } from './src/utils/functions.js';
import cors from "cors"
import { connectDB } from './src/config/dbConfig.js';
import User from './src/models/userSchema.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs";
import { verifyToken } from './src/middlewares/verifyToken.js';
import Generation from './src/models/generationSchema.js';

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

app.use('/generate', (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // OR authHeader.slice(7);

    try {
        let user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = user;
    } catch (err) {
        console.log("err", err)
        return res.status(403).json({ message: "Invalid or expired token" });
    }

    // console.log("Extracted Token:", token);

    next()
})

app.post('/generate', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const user = await User.findOne({ email: req.user.email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = await generate(req.body);
        if (!data) return res.status(500).json({ message: "Generation failed" });

        const jsonData = await trimAndParseJson(data.candidates[0].content.parts[0].text);
        if (!jsonData) return res.status(500).json({ message: "Invalid AI response" });

        const { recommendedStreams = [], nearbyColleges = [], scholarshipAlerts = [] } = jsonData;

        const newGeneration = new Generation({
            userId: user._id,
            recommendedStreams,
            nearbyColleges,
            scholarshipAlerts
        });

        const savedData = await newGeneration.save();
        console.log("Saved Generation:", savedData);

        res.status(201).json(jsonData);

    } catch (error) {
        console.error("Error in generate route:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.post('/user/create', async (req, res) => {
    if (req.body) {
        const isUserAlreadyExist = await User.findOne({ email: req.body.email });
        if (isUserAlreadyExist) {
            console.log("User already exists")
            res.status(201).json({ success: false, message: "User already exists!", });
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            age: req.body.age,
            currentClass: req.body.currentClass
        })

        const savedUser = await user.save()

        const token = jwt.sign({
            id: savedUser._id, email: savedUser.email
        }, jwtPrivateKey, {
            expiresIn: 600,
        })

        res.status(201).json({ success: true, token, message: "Signed Up Successfully" })
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
                    expiresIn: 600,
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