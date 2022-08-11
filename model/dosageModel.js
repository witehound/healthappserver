import mongoose from "mongoose";
import { userModel } from "./userModel.js";

const dosageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: userModel,
    },
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const dosageModel = mongoose.model("dosage", dosageSchema);
