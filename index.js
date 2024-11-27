const express=require('express')
const app=express();
require('dotenv').config()
const fileUpload=require('express-fileupload')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const {dbconnect}=require('./config/dbconnect')
const {cloudinary}=require('./config/cloudinary')

//routes
console.log("ok1")
const userRoutes=require('./routes/User')
const courseRoutes=require('./routes/Course')
// const paymentRoutes=require('./routes/Payments')
const profileRoutes=require('./routes/Profile')

console.log("ok2")
const PORT=process.env.PORT || 5000
dbconnect()
cloudinary()

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors())


//routes
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/auth',userRoutes)
// app.use('/api/v1/payment',paymentRoutes)




app.listen(PORT,()=>{
    console.log(`app is listning at port ${PORT}`)
})
app.get('/',(req,res)=>{
    console.log("working fine")
    res.send("hello from studyPath")
})

