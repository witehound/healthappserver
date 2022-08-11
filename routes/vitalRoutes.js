import { Router } from "express";
import { verify } from "../middleWare/auth.js";
import {
  createVital,
  updateVitals,
  deleteVital,
  getVital,
} from "../controller/vitalControllers.js";

const router = new Router();

router.get("/", verify, getVital);
router.post("/", verify, createVital);
router.put("/:id", verify, updateVitals);
router.delete("/:id", verify, deleteVital);

export default router;
