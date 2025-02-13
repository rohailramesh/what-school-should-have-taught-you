import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //if any of the fields are missing
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // checking password meets requirements
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken((await newUser).id, res); // generating token but waiting for the promise to resolve
      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(500).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user.id, res);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Error in login controller: ", error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); //clearing the cookie
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ message: "Auth successful" }); //this is to check if the user is authenticated
  } catch (error) {
    console.log("Error in checkAuth controller: ", error);
    res.status(500).json({ message: error.message });
  }
};
