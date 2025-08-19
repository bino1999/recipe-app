import { connect } from "mongoose";
import { MONGO_URI } from "../config/env.mjs";

const dbConnect = async()=>{
    try {
        await connect(MONGO_URI)
    } catch (error) {
        return console.error('Database connection error:', error);
    }
}

export default dbConnect;