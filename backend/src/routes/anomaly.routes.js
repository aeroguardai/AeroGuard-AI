// anomaly.routes.js
import express from 'express';
import { detectAnomaly } from '../controllers/anomaly.controller.js';

const router = express.Router();

router.post('/predict', detectAnomaly);

export default router;
