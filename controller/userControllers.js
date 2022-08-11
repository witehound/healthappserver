import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { generateToken } from "../helper/jwt.js";

//@desc Fetch a user
//@route Get /api/user
//@access Private
export const getUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    address,
    userName,
    _id,
  } = await userModel.findById(req.user.id);

  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    email,
    age,
    gender,
    address,
    userName,
  });
});

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
      token: generateToken(user.id),
    });
  } else {
    return res.status(400).json({ message: `Failed to create a new user.` });
  }
});

//@desc Update a user
//@route Put /api/user/id
//@access Private
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log(id);
  let user = await userModel.findById(id);
  if (!user) {
    return res.status(400).json({ message: `user does not exist` });
  }

  //update user
  await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ message: `updated profile` });
});

//@desc Delete a user
//@route Delete /api/user/id
//@access Private
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  let user = await userModel.findById(id);
  if (!user) {
    return res.status(400).json({ message: `user does not exist` });
  }

  //delet user
  await userModel.findByIdAndDelete(id, {
    new: true,
  });
  res.status(200).json({ message: `deleted profile` });
});

//@desc Login a user
//@route Post /api/user/login
//@access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const newUser = await userModel.findOne({ email });
  if (!newUser) {
    return res.status(400).json({ message: `Incorect Details.` });
  }

  //comapre password
  const verifiedPassword = await bcrypt.compare(password, newUser.password);
  if (!verifiedPassword) {
    return res.status(400).json({ message: `Incorect Password.` });
  }

  return res.status(200).json({
    _id: newUser.id,
    userName: newUser.userName,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    age: newUser.age,
    gender: newUser.gender,
    address: newUser.address,
    token: generateToken(newUser.id),
  });
});
