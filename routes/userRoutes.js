import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUser,
} from "../controller/userControllers.js";
import { verify } from "../middleWare/auth.js";

const router = new Router();

router.get("/", verify, getUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.put("/", verify, updateUser);
router.delete("/", verify, deleteUser);

export default router;
