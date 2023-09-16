import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0/logincrud")
        console.log(">>> Database connected")
    } catch (error) {
        console.log(error)
    }
}