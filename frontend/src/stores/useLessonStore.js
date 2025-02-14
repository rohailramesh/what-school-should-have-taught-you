import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLessonStore = create((set) => ({
  lessons: [],
  loading: false,
  getAllLessons: async () => {
    try {
      const response = await axios.get("/lessons");
      set({ lessons: response.data.lessons, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch lessons", loading: false });
      toast.error(error.response.data.error || "Failed to fetch lessons");
    }
  },

  createLesson: async (lesson) => {
    set({ loading: true });
    try {
      const res = await axios.post("/lessons", lesson);
      set((prevState) => ({
        lessons: [...prevState.lessons, res.data],
        loading: false,
      })); //this is to update the state with the new lesson and keep the previous lessons
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  deleteLesson: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/lessons/${id}`);
      set((prevState) => ({
        lessons: prevState.lessons.filter((lesson) => lesson._id !== id),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  updateLesson: async (id, lesson) => {
    set({ loading: true });
    try {
      const res = await axios.put(`/lessons/${id}`, lesson);
      set((prevState) => ({
        lessons: prevState.lessons.map((lesson) =>
          lesson._id === id ? res.data : lesson
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
}));

export default useLessonStore;