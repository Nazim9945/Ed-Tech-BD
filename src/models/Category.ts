import mongoose from 'mongoose'
const category=new mongoose.Schema({
   name:{
    type:String,
    trim:true,
   },
   description:{
    type:String,
    trim:true,
   },
   course:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
    }
   ]



})

const Category=mongoose.model("Category",category)
export default Category