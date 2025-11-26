import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { engine_temp, oil_pressure, vibration } = req.body;

  if (!engine_temp || !oil_pressure || !vibration) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // simple rule-based anomaly logic
  const isAnomaly =
    engine_temp > 600 ||
    oil_pressure < 40 ||
    vibration > 1.5;

  res.json({ anomaly: isAnomaly ? 1 : 0 });
});

export default router;
