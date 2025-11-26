export const getAnomalyPrediction = async (req, res) => {
  try {
    const { engine_temp, oil_pressure, vibration, flight_hours } = req.body;

    // Simple rule-based anomaly detection
    let anomaly = 0;

    if (engine_temp > 600 || oil_pressure < 40 || vibration > 1.5) {
      anomaly = 1;
    }

    return res.json({
      anomaly,
      message: anomaly === 1 ? "Anomaly detected 🚨" : "Normal condition ✓"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
