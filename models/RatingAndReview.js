const mongoose =require('mongoose')
const ratingAndreview=new mongoose.Schema({
   
User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"

},
rating:{
    type:Number,
    required:true
},
review:{
type:String,
required:true
},
course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
    required:true,
}

})

module.exports=mongoose.model("RatingAndReview",ratingAndreview)