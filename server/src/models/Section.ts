import mongoose from "mongoose";
const section = new mongoose.Schema({
  sectionName: {
    type: String,
    trim: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

const Section=mongoose.model("Section", section);
export default Section
