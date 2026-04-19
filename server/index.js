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
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: '.env' })

const app = express()
const port = 3000
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY

connectDB()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post('/generate', verifyToken, async (req, res) => {
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
        console.log("data ", data);

        if (!data) return res.status(500).json({ message: "Generation failed" });

        const jsonData = await trimAndParseJson(data.candidates[0].content.parts[0].text);
        if (!jsonData) return res.status(500).json({ message: "Invalid AI response" });

        console.log("jsonData ", jsonData);

        const { recommendedStreams = [], nearbyColleges = [], scholarshipAlerts = [] } = jsonData;

        const newGeneration = new Generation({
            userId: user._id,
            recommendedStreams,
            nearbyColleges,
            scholarshipAlerts
        });

        const savedData = await newGeneration.save();
        // console.log("Saved Generation:", savedData);

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

app.get('/user/generations', verifyToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const generations = await Generation.find({ userId: user._id })
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(10); // Limit to last 10 generations

        res.status(200).json({
            success: true,
            generations,
            message: "Generations fetched successfully"
        });

    } catch (error) {
        console.error("Error fetching generations:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.listen(port, () => {
    console.log("Server Started at Port ", port)
})