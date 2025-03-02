import User from "../models/userSchema.js";
import Experience from "../models/experienceSchema.js";

const getAllUsers = async (req, res, next) => {
  try {
    const returnAll = await User.find();

    res.json(returnAll);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const returnUser = await User.findById(req.params.id);

    res.json(returnUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const modifyUser = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `http://localhost:3001/uploads/${req.file.filename}`;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData);
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getExperiences = async (req, res, next) => {
  try {
    const returnExperiences = await User.findById(req.params.id).populate(
      "experiences"
    );

    res.json(returnExperiences);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const newExperience = await Experience.create(req.body);
    const user = await User.findByIdAndUpdate(req.params.id);
    user.experiences.push(newExperience._id);
    await user.save();
    res.json(newExperience);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const modifyExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(experience);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    const user = await User.findOne({ experiences: req.params.id });
    if (user) {
      user.experiences.pull(req.params.id);
      await user.save();
    }
    res.json(experience);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  getAllUsers,
  getUserById,
  modifyUser,
  getExperiences,
  createExperience,
  modifyExperience,
  deleteExperience,
};
