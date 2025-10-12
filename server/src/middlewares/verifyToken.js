import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({ path: '.env' })

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }

    const token = authHeader.split(" ")[1]; // get token part

    try {
        const decoded = jwt.verify(token, jwtPrivateKey);
        req.user = decoded; // attach decoded user data (id, email, etc.)
        next();
    } catch (err) {
        // console.error("Token verification failed:", err);
        return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
};