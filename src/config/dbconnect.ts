import mongoose from 'mongoose'
import 'dotenv/config'
const dbconnect=async()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL as string).then(()=>{
            console.log("DB connected successfully")
        })
        
    } catch (error) {
        console.log("failed to connect with db");
        console.log(error);
        process.exit(1)
    }
}
export default dbconnect
