import { dosageModel } from "../model/dosageModel.js";
import { userModel } from "../model/userModel.js";
import asyncHandler from "express-async-handler";

//@desc Get all dosage
//@route Get /api/dosage/
//@access Private
export const getDosages = asyncHandler(async (req, res) => {
  //fetch all appointment
  const dosages = await dosageModel.find();
  let userDosage = [];
  for (let dos of dosages) {
    if (dos.user == req.user.id) {
      userDosage.push(dos);
    }
  }
  res.status(200).json(userDosage);
});

//@desc Create a dosage
//@route Post /api/dosage/
//@access Private
export const createDosage = asyncHandler(async (req, res) => {
  const { timesPerDay, timesPerWeek, dosage, name } = req.body;

  //verify all feilds
  if (!timesPerDay || !timesPerWeek || !dosage || !name) {
    return res.status(400).json({ message: `add all fields` });
  }

  //save new appointment
  const newDosage = new dosageModel({
    timesPerDay,
    timesPerWeek,
    dosage,
    name,
    user: req.user.id,
  });
  await newDosage.save();
  res.status(200).json({ newDosage, message: `added new dosage` });
});

//@desc Update a dosage
//@route Put /api/appointment/id
//@access Private
export const updateDosage = asyncHandler(async (req, res) => {
  const dosage = await dosageModel.findById(req.params.id);
  if (!dosage) {
    res.status(400).json({ message: "no dosage with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (dosage.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //update new appointment
  const newDos = await dosageModel.findByIdAndUpdate(dosage._id, req.body, {
    new: true,
  });
  res.status(200).json({ newDos, message: `updated dosage` });
});

//@desc Delete a dosage
//@route Delete /api/dosage/id
//@access Private
export const deleteDosage = asyncHandler(async (req, res) => {
  const dosage = await dosageModel.findById(req.params.id);
  if (!dosage) {
    res.status(400).json({ message: "no dosage with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (dosage.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //delete appointment
  await dosageModel.findByIdAndDelete(dosage._id);
  res.status(200).json({ message: `delted dosage` });
});
