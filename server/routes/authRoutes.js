import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Invalid input fields",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: cleanEmail,
      password: hashedPassword,
    });

    const jwtSecret = process.env.JWT_SECRET || "career_compass_fallback_jwt_secret_2026";
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR TRACE:", error);
    res.status(500).json({
      message: error.message || "Registration failed",
      errorName: error.name,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid credentials format" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const jwtSecret = process.env.JWT_SECRET || "career_compass_fallback_jwt_secret_2026";
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("LOGIN ERROR TRACE:", error);
    res.status(500).json({
      message: error.message || "Login failed",
      errorName: error.name,
    });
  }
});

router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = req.body.role || user.role;
    user.education = req.body.education || user.education;
    user.targetRole = req.body.targetRole || user.targetRole;

    if (req.body.skills) {
      user.skills = typeof req.body.skills === "string"
        ? req.body.skills.split(",").map(skill => skill.trim()).filter(Boolean)
        : Array.isArray(req.body.skills) ? req.body.skills : user.skills;
    }

    user.experience = req.body.experience || user.experience;
    user.profileCompleted = true;

    await user.save();

    res.json({ message: "Profile Updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;