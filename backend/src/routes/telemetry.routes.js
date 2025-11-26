import express from 'express';
import { getLatestTelemetry } from '../controllers/telemetry.controller.js';
const router = express.Router();
router.get('/latest', getLatestTelemetry);
export default router;

