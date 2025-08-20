import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";
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

authRouter.post("/login", (req, res) => {
  res.send("Login Page");
});

export default authRouter;
