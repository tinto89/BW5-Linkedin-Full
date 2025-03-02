import express from "express";
import multer from "multer";
import {
  createExperience,
  deleteExperience,
  getAllUsers,
  getExperiences,
  getUserById,
  modifyExperience,
  modifyUser,
} from "../controllers/queries.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", upload.single("image"), modifyUser);
router.get("/:id/experiences", getExperiences);
router.post("/:id/experiences", createExperience);
router.put("/:id/experiences/:id", modifyExperience);
router.delete("/:id/experiences/:id", deleteExperience);

export { router };
