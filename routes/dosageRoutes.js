import { Router } from "express";
import { verify } from "../middleWare/auth.js";
import {
  getDosages,
  updateDosage,
  createDosage,
  deleteDosage,
} from "../controller/dosageControllers.js";

const router = new Router();

router.route("/").get(verify, getDosages).post(verify, createDosage);
router.route("/:id").put(verify, updateDosage).delete(verify, deleteDosage);

export default router;

