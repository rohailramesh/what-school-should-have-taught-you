import User from "../models/user.model.js";
import Lesson from "../models/lesson.model.js";

export const getLessons = async (req, res) => {
  try {
    const allLessons = await Lesson.find({});
    res.json({ allLessons });
  } catch (error) {
    console.log("Error in getLessons controller: ", error);
  }
};

export const createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newLesson = await Lesson.create({
      title,
      description,
    });
    res.status(201).json({ newLesson });
  } catch (error) {
    console.log("Error in createLesson controller: ", error);
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ updatedLesson });
  } catch (error) {
    console.log("Error in updateLesson controller: ", error);
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.log("Error in deleteLesson controller: ", error);
  }
};
