import express from "express";
import {
  createLesson,
  getLessons,
  deleteLesson,
  updateLesson,
} from "../controllers/lesson.controller.js";

const router = express.Router();

router.post("/create-lesson", createLesson);
router.get("/get-lessons", getLessons);
router.delete("/delete-lesson/:id", deleteLesson);
router.put("/update-lesson/:id", updateLesson);

export default router;
