import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  title: String,
  area: String,
  bio: String,
  image: String,
  experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: "experiences" }],
});

const User = mongoose.model("users", userSchema);

export default User;
