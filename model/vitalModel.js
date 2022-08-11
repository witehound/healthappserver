import mongoose from "mongoose";
import { userModel } from "./userModel.js";

const vitalsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: userModel,
      unique: true,
    },
    blodPressure: {
      type: String,
    },
    Glucoselevel: {
      type: String,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const vitalsModel = mongoose.model("vital", vitalsSchema);
