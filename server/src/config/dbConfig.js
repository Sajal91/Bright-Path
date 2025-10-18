import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({ path: '.env' })

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database Connected Successfully");
    } catch (err) {
        console.log("Some Error occured while connecting to database", err);
    }
};