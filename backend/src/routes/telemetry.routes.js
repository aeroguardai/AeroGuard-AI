import express from "express";
import {
  postTelemetry,
  getLatestTelemetry,
  getTelemetryHistory
} from "../controllers/telemetry.controller.js";

const router = express.Router();

// POST telemetry
router.post("/", postTelemetry);

// GET latest row
router.get("/latest", getLatestTelemetry);

// GET history
router.get("/history", getTelemetryHistory);

export default router;
