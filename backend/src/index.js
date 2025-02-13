import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import lessonRoutes from "./routes/lesson.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/api/lessons", lessonRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
