import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  startDate: String,
  endDate: String,
  description: String,
  area: String,
});

const Experience = mongoose.model("experiences", experienceSchema);

export default Experience;
