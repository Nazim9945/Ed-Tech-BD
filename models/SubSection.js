const mongoose =require('mongoose')
const subsection=new mongoose.Schema({
   title:{
    type:String,
    trim:true
   },
   vedioUrl:{
    type:String,
    trim:true
   },
   timeDuration:{
    type:String,
    trim:true
   },
   description:{
    type:String,
    trim:true
   },



})

module.exports=mongoose.model("SubSection",subsection)