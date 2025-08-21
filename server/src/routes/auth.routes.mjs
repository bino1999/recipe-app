import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";
import { JWT_SECRET } from "../config/env.mjs";
const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Authentication Page");
});

authRouter.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ msg: "User already exists" });
  }

  try {
    const newUser = new User({
      userName,
      email,
      password,
    });
    await newUser.save().then(() => {
      res
        .status(201)
        .send({ msg: "User registered successfully", user: newUser });
    });
  } catch (error) {}
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect Pasword" });
  }
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({
    msg:"user login succesfully",
    token:token
  });
});

export default authRouter;
