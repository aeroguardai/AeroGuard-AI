import express from "express";
import { postTelemetry, getLatestTelemetry } from "../controllers/telemetry.controller.js";

const router = express.Router();

router.post("/", postTelemetry);
router.get("/latest", getLatestTelemetry);

export default router;
