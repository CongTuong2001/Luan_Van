import express from "express";
import { verifyToken } from "../midleware/login.midleware.js";
import {
  getAllTeacher,
  createTeacher,
  deleteTeacher,
  updateTeacher,
} from "../controllers/teacher.controller.js";
import multer from "multer";

const router = express.Router();

// Get all teacher in a class
router.get("/teacher/all/", getAllTeacher);

router.post("/teacher/create", createTeacher);

router.delete("/teacher/delete/:id", deleteTeacher);

router.patch("/teacher/update/:id", updateTeacher);

export default router;
