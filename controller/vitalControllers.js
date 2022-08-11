import { vitalsModel } from "../model/vitalModel.js";
import { userModel } from "../model/userModel.js";
import asyncHandler from "express-async-handler";

//@desc Get a appointments
//@route Get /api/appointment/
//@access Private
export const getVital = asyncHandler(async (req, res) => {
  //verify user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  const vital = await vitalsModel.findOne({ user: user.id });
  res.status(200).json(vital);
});

//@desc Create a avital
//@route Post /api/vital
//@access Private
export const createVital = asyncHandler(async (req, res) => {
  //verify non exitence
  const vital = await vitalsModel.findOne({ user: req.user.id });
  if (vital) {
    res.status(401).json(`vital already exists`);
  }

  //save new appointment
  const newVital = new vitalsModel({
    ...req.body,
    user: req.user.id,
  });
  await newVital.save();
  res.status(200).json({ newVital, message: `added new vital` });
});

//@desc Update a vital
//@route Put /api/vital/id
//@access Private
export const updateVitals = asyncHandler(async (req, res) => {
  const vital = await vitalsModel.findById(req.params.id);
  if (!vital) {
    res.status(400).json({ message: "no appointment with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (vital.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //update new appointment
  const newVital = await vitalsModel.findByIdAndUpdate(vital._id, req.body, {
    new: true,
  });
  res.status(200).json({ newVital, message: `updated vital` });
});

//@desc Delete a vital
//@route Delete /api/vital/id
//@access Private
export const deleteVital = asyncHandler(async (req, res) => {
  const vital = await vitalsModel.findById(req.params.id);
  if (!vital) {
    res.status(400).json({ message: "no appointment with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (vital.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //delete appointment
  await vitalsModel.findByIdAndDelete(vital._id);
  res.status(200).json({ message: `delted appointment` });
});
