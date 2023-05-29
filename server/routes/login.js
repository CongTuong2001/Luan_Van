import express from "express";
import {
  login,
  createStudentAccount,
  deleteStudentAccount,
  deleteTeacherAccount,
  changePassword,
} from "../controllers/login.controller.js";
const router = express.Router();

router.post("/login", login);

router.delete("/delete-student-account/:mhs", deleteStudentAccount);

router.delete("/delete-teacher-account/:mgv", deleteTeacherAccount);

router.post("/create-student-account", createStudentAccount);

router.patch("/change-password", changePassword);

// export default login;

export default router;
