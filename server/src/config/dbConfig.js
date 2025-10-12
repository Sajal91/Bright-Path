import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bright-path");
        console.log("Database Connected Successfully");
    } catch (err) {
        console.log("Some Error occured while connecting to database", err);
    }
};