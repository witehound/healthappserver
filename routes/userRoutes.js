import { Router } from "express";
import { createUser, updateUser } from "../controller/userControllers.js";

const router = new Router();
// router.get("/", getMe);
router.post("/", createUser);
// router.post("/login", loginUser);
router.put("/: id", updateUser);
// router.deleteMe("/", deleteMe);

export default router;
