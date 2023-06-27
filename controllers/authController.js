import User from "../models/User.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


//REGISTER
export const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};

//LOGIN
export const login = async (req, res, next) => {
  try {
    const loginUser = await User.findOne({ username: req.body.username });
    //console.log(loginUser._id);
    if (!loginUser) return next(createError(404, "Incorrect Username"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong Password "));

    const token = jwt.sign(
      { id: loginUser._id, isAdmin: loginUser.isAdmin, },
      process.env.JWT
    );

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send(loginUser);
  } catch (error) {
    next(error);
  }
};
