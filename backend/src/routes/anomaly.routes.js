import express from 'express';
import { detectAnomaly } from '../controllers/anomaly.controller.js';

const router = express.Router();

router.post('/', detectAnomaly);

export default router;
