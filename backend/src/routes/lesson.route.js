import express from "express";
import {
  createLesson,
  getLessons,
  deleteLesson,
  updateLesson,
} from "../controllers/lesson.controller.js";

const router = express.Router();

router.post("/create-lesson", createLesson); //working
router.get("/get-lessons", getLessons); //working
router.delete("/delete-lesson/:id", deleteLesson); //working
router.put("/update-lesson/:id", updateLesson); //working

export default router;
