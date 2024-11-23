const mongoose=require('mongoose')
exports.dbconnect=async()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL).then(()=>{
            console.log("DB connected successfully")
        })
        
    } catch (error) {
        console.log("failed to connect with db");
        console.log(error);
    }
}
