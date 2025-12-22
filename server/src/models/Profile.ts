import mongoose from "mongoose";
const profileschema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfbirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

export default mongoose.model("Profile", profileschema);
