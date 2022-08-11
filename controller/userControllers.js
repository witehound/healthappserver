import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
// import { generateToken } from "../helper/jwt.js";

//@desc Register a user
//@route Post /api/user
//@access Public
export const createUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    address,
    userName,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !age ||
    !gender ||
    !address ||
    !userName
  ) {
    return res.status(400).json({ message: `add all fields` });
  }
  let user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: `user already exist` });
  }

  //hash password
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);

  //createuser
  user = new userModel({
    userName,
    firstName,
    lastName,
    password: hashedPassword,
    email,
    age,
    gender,
    address,
  });
  const newUser = await user.save();
  if (newUser) {
    return res.status(201).json({
      _id: newUser.id,
      userName: newUser.userName,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      age: newUser.age,
      gender: newUser.gender,
      address: newUser.address,
      // token: generateToken(user.id),
    });
  } else {
    return res.status(400).json({ message: `Failed to create a new user.` });
  }
});

//@desc Update a user
//@route Put /api/user
//@access Private
export const updateUser = asyncHandler(async (req, res) => {
  let user = await userModel.findOne({ email: req.body.mail });
  if (user) {
    return res.status(400).json({ message: `user already exist` });
  }
});
