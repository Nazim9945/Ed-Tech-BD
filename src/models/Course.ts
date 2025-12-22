import mongoose from "mongoose";
const course = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  whatYouWillLearn: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tag: {
    type: [String],
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  ratingsAndreviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReviews",
    },
  ],
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Course= mongoose.model("Course", course);
export default Course
