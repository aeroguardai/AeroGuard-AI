import express from 'express';
import { getTelemetry } from '../controllers/telemetry.controller.js';

const router = express.Router();

// GET /api/telemetry/live
router.get('/live', getTelemetry);

export default router;
