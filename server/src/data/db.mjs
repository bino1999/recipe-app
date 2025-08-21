import { connect } from "mongoose";


const dbConnect = async()=>{
    try {
        await connect(process.env.MONGO_URI)
    } catch (error) {
        return console.error('Database connection error:', error);
    }
}

export default dbConnect;