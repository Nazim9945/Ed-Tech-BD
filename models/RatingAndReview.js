const mongoose =require('mongoose')
const ratingAndreview=new mongoose.Schema({
   
User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"

},
Rating:{
    type:Number,
    required:true
},
Review:{
type:String,
required:true
}

})

module.exports=mongoose.model("RatingAndReview",ratingAndreview)