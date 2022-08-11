import mongoose from "mongoose";
import { userModel } from "./userModel.js";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: userModel,
    },
    date: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const appointmentModel = mongoose.model(
  "appointment",
  appointmentSchema
);
