import express from "express";
import {
  checkAuth,
  signup,
  login,
  logout,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup); //working
router.post("/login", login); //working
router.post("/logout", logout); //working
router.get("/check-auth", protectRoute, checkAuth); //working

export default router;
