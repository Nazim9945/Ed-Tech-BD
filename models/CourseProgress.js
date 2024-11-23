const mongoose =require('mongoose')
const courseProgress=new mongoose.Schema({
   
course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
},
completedVedios:[
    {
         type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection"
    }
]


})

module.exports=mongoose.model("CourseProgress",courseProgress)