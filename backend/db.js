import mongoose from "mongoose";

export async function connectDB() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("Missing MONGO_URI in .env");

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    } catch (err) {
        console.log("fail to connect database", err.message);
    }
}