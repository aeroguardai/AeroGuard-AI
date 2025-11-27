// backend/src/routes/telemetry.routes.js
import express from "express";
import { postTelemetry, getLatestTelemetry, getTelemetryHistory } from "../controllers/telemetry.controller.js";

const router = express.Router();

router.post("/", postTelemetry);          // send new telemetry data
router.get("/latest", getLatestTelemetry); // get latest reading
router.get("/history", getTelemetryHistory); // get full history

export default router;
