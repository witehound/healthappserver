import { conditionModel } from "../model/condition.js";
import { userModel } from "../model/userModel.js";
import asyncHandler from "express-async-handler";

//@desc Get conditions
//@route Get /api/condition/
//@access Private
export const getConditions = asyncHandler(async (req, res) => {
  //fetch all conditions
  const conditions = await conditionModel.find();
  let userConditions = [];
  for (let con of conditions) {
    if (con.user == req.user.id) {
      userConditions.push(con);
    }
  }
  res.status(200).json(userConditions);
});

//@desc Create a condition
//@route Post /api/condition
//@access Private
export const createCondition = asyncHandler(async (req, res) => {
  const { yearStart, yearEnd, state, name } = req.body;

  //verify all feilds
  if (!yearStart || !yearEnd || !state) {
    return res.status(400).json({ message: `add all fields` });
  }

  //save new appointment
  const newCondition = new conditionModel({
    yearStart,
    yearEnd,
    state,
    name,
    user: req.user.id,
  });
  await newCondition.save();
  res.status(200).json({ newCondition, message: `added new condition` });
});

//@desc Update a condition
//@route Put /api/constion/id
//@access Private
export const updateCondition = asyncHandler(async (req, res) => {
  const condition = await conditionModel.findById(req.params.id);
  if (!condition) {
    res.status(400).json({ message: "no condition with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (condition.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //update new appointment
  const newCon = await conditionModel.findByIdAndUpdate(
    condition._id,
    req.body,
    { new: true }
  );
  res.status(200).json({ newCon, message: `updated condition` });
});

//@desc Delete a condition
//@route Delete /api/condition/id
//@access Private
export const deleteAppointment = asyncHandler(async (req, res) => {
  const condition = await conditionModel.findById(req.params.id);
  if (!condition) {
    res.status(400).json({ message: "no condition with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (condition.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //delete appointment
  await conditionModel.findByIdAndDelete(condition._id);
  res.status(200).json({ message: `delted condition` });
});
