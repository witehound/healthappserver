import { Router } from "express";
import { verify } from "../middleWare/auth.js";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
} from "../controller/appointmentController.js";

const router = new Router();

router.get("/", verify, getAppointment);
router.post("/", verify, createAppointment);
router.put("/:id", verify, updateAppointment);
router.delete("/:id", verify, deleteAppointment);

export default router;
