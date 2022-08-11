import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { userModel } from "../model/userModel.js";

export const verify = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify the token
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);

      //get user
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json(" unauthorized access");
    }
  }

  if (!token) {
    return res.status(401).json(" unauthorized access");
  }
});
