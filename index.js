import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import vitalRoute from "./routes/vitalRoutes.js";
import dosageRoute from "./routes/dosageRoutes.js";

import configDB from "./config/db.js";

const app = express();
configDB();
const port = process.env.PORT || 8080;

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`server live on port ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/appointment", appointmentRoute);
app.use("/api/vital", vitalRoute);
app.use("/api/dosage", dosageRoute);
