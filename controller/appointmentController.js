import { appointmentModel } from "../model/appointment.js";
import { userModel } from "../model/userModel.js";
import asyncHandler from "express-async-handler";

//@desc Get a appointments
//@route Get /api/appointment/
//@access Private
export const getAppointment = asyncHandler(async (req, res) => {
  //fetch all appointment
  const Appointments = await appointmentModel.find();
  let userAppointment = [];
  for (let app of Appointments) {
    if (app.user == req.user.id) {
      userAppointment.push(app);
    }
  }
  res.status(200).json(userAppointment);
});

//@desc Create a appointment
//@route Post /api/appointment
//@access Private
export const createAppointment = asyncHandler(async (req, res) => {
  const { date, doctor, hospital, time } = req.body;

  //verify all feilds
  if (!date || !doctor || !hospital || !time) {
    return res.status(400).json({ message: `add all fields` });
  }

  //save new appointment
  const newAppointment = new appointmentModel({
    date,
    doctor,
    hospital,
    time,
    user: req.user.id,
  });
  await newAppointment.save();
  res.status(200).json({ newAppointment, message: `added new goal` });
});

//@desc Update a uappointment
//@route Put /api/appointment/id
//@access Private
export const updateAppointment = asyncHandler(async (req, res) => {
  const appointmnet = await appointmentModel.findById(req.params.id);
  if (!appointmnet) {
    res.status(400).json({ message: "no appointment with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (appointmnet.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //update new appointment
  const newApp = await appointmentModel.findByIdAndUpdate(
    appointmnet._id,
    req.body,
    { new: true }
  );
  res.status(200).json({ newApp, message: `updated appointment` });
});

//@desc Delete a user
//@route Delete /api/appointment/id
//@access Private
export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointmnet = await appointmentModel.findById(req.params.id);
  if (!appointmnet) {
    res.status(400).json({ message: "no appointment with this id" });
  }

  //check user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(401).json(`user not found`);
  }

  if (appointmnet.user.toString() !== user.id) {
    res.status(401).json({ message: `user not authorized` });
  }

  //delete appointment
  await appointmentModel.findByIdAndDelete(appointmnet._id);
  res.status(200).json({ message: `delted appointment` });
});
