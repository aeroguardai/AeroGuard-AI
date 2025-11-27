// telemetry.routes.js
import express from 'express';
import { 
  postTelemetry, 
  getLatestTelemetry, 
  getTelemetryHistory 
} from '../controllers/telemetry.controller.js';

const router = express.Router();

router.post('/', postTelemetry);
router.get('/latest', getLatestTelemetry);
router.get('/history', getTelemetryHistory);

export default router;
