import express from "express";
import { 
  systemHealth, 
  telemetryStatus, 
  anomalyModelStatus 
} from "../controllers/monitor.controller.js";

const router = express.Router();

router.get("/health", systemHealth);
router.get("/telemetry-status", telemetryStatus);
router.get("/anomaly-status", anomalyModelStatus);

export default router;
