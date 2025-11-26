export const detectAnomaly = (req, res) => {
  const { engine_temp, oil_pressure, vibration, flight_hours } = req.body;

  if (
    engine_temp === undefined ||
    oil_pressure === undefined ||
    vibration === undefined ||
    flight_hours === undefined
  ) {
    return res.status(400).json({ error: "Missing input fields" });
  }

  // Engine Temperature Score
  let temp_score = 0;
  if (engine_temp > 580 && engine_temp <= 650) {
    temp_score = ((engine_temp - 580) / 70) * 20; // 0–20
  } else if (engine_temp > 650) {
    temp_score = 25;
  }

  // Oil Pressure Score
  let oil_score = 0;
  if (oil_pressure >= 40) {
    oil_score = 0;
  } else if (oil_pressure >= 30 && oil_pressure < 40) {
    oil_score = 20;
  } else if (oil_pressure < 30) {
    oil_score = 40;
  }

  // Vibration Score (most important)
  let vib_score = vibration * 25;
  if (vib_score > 35) vib_score = 35; // cap

  // Flight Hours Score (small impact)
  let hours_score = (flight_hours / 2000) * 10;
  if (hours_score > 10) hours_score = 10;

  // Final Score
  const score = Math.round(
    temp_score * 0.3 +
    oil_score * 0.3 +
    vib_score * 0.35 +
    hours_score * 0.05
  );

  // Anomaly decision
  const anomaly = score > 50 ? 1 : 0;

  // Severity
  let severity = "Low";
  if (score >= 30 && score <= 60) severity = "Medium";
  if (score > 60) severity = "High";

  // Recommendation
  let recommendation = "No issues detected.";
  if (severity === "Medium")
    recommendation = "Schedule maintenance — abnormal patterns identified.";
  if (severity === "High")
    recommendation = "Immediate inspection required — high-risk anomaly detected.";

  return res.json({
    anomaly,
    score,
    severity,
    recommendation,
  });
};
