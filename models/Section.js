const mongoose =require('mongoose')
const section=new mongoose.Schema({
   sectionName:{
    type:String,
    trim:true
   },
   subSection:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection"
   }]


})

module.exports=mongoose.model("Section",section)