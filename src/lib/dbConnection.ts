import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;


if(!mongoURI){
    throw new Error("Valid URI not found in the .env file!");
}

export const connectToDB = async ()=>{
    console.log('Attemping database connection...');
    try{
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to the database.');
    } catch (err){
        console.error("X: Database connection failed! (", err, ")");
        process.exit(1); // occurs before the frontend is needed: IS OKAY
    }
}
