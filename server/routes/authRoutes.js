import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",async(req,res)=>{const {name,email,password} = req.body;

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    message: "User already exists",
  });
}

const hashedPassword= await bcrypt.hash(password, 10);

const user =await User.create({
    name,
    email,
    password: hashedPassword,
});

res.status(201).json({
  _id: user._id,
  name: user.name,
  email: user.email,
});

});

router.get("/me", async (req, res) => {
  res.json(req.user);
});

router.post("/login", async (req, res) => 
{
  try {
    const {email, password} = req.body;
    const user =await User.findOne({email});
    if (!user) return res.status(400).json({ message: "User Not Found"});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
        return res.status(400).json({message: "Invalid Crendentials"});
    const token = jwt.sign({id: user._id }, process.env.JWT_SECRET,{expiresIn: "1d",});
    res.json({token,user});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/profile", protect, async(req, res)=>{
  try{
    const user = await User.findById(req.user.id);

    user.role=req.body.role;
    user.education=req.body.education;
    user.targetRole=req.body.targetRole;
    user.skills= req.body.skills.split(",").map(skill => skill.trim());
    user.experience= req.body.experience;
    user.profileCompleted=true;

    await user.save();

    res.json({ message: "Profile Updated",});
  } catch (error) {
    res.status(500).json({ message:error.message,});
  }
});

router.get("/me", protect,async(req, res) => {
  try{
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;