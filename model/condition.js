import mongoose from "mongoose";
import { userModel } from "./userModel.js";

const conditionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: userModel,
    },
    yearStart: {
      type: String,
      required: true,
    },
    yearEnd: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const conditionModel = mongoose.model("condition", conditionSchema);
