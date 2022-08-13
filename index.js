import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import vitalRoute from "./routes/vitalRoutes.js";
import dosageRoute from "./routes/dosageRoutes.js";
import conditionRoute from "./routes/conditionRoutes.js";
import cors from "cors";
import morgan from "morgan";

import configDB from "./config/db.js";

const app = express();
configDB();
const port = process.env.PORT || 8080;

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));
app.listen(port, () => {
  console.log(`server live on port ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/appointment", appointmentRoute);
app.use("/api/vital", vitalRoute);
app.use("/api/dosage", dosageRoute);
app.use("/api/conditions", conditionRoute);
