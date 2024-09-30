import mongoose from "mongoose";
import env from "dotenv";

env.config()

export default function connectDb() {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DATABASE CONNECTED!");
    })
    .catch(() => {
        console.log("CONNECTION FAILED!")
    })
};




