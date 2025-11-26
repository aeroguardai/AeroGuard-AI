import express from 'express';
import { detectAnomaly } from '../services/anomaly.service.js';

const router = express.Router();

router.post('/predict', async (req, res) => {
  const result = await detectAnomaly(req.body);
  res.json(result);
});

export default router;

