import { Router } from "express";
import { verify } from "../middleWare/auth.js";
import {
  getConditions,
  createCondition,
  updateCondition,
  deleteAppointment,
} from "../controller/conditionController.js";

const router = new Router();

router.route("/").get(verify, getConditions).post(verify, createCondition);
router
  .route("/:id")
  .put(verify, updateCondition)
  .delete(verify, deleteAppointment);

export default router;
