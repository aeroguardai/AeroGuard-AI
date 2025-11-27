import express from 'express';
import { getTelemetry } from '../controllers/telemetry.controller.js';

const router = express.Router();

// GET /api/telemetry
router.get('/', getTelemetry);

export default router;
