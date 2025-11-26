export const detectAnomaly = async (req, res) => {
  try {
    const { engine_temp, oil_pressure, vibration, flight_hours } = req.body;

    if (
      engine_temp === undefined ||
      oil_pressure === undefined ||
      vibration === undefined ||
      flight_hours === undefined
    ) {
      return res.status(400).json({ error: "Missing input values" });
    }

    // Simple logic (since model training is skipped)
    const isAnomaly =
      engine_temp > 600 ||
      oil_pressure < 40 ||
      vibration > 1.5 ||
      flight_hours > 5000;

    res.json({
      anomaly: isAnomaly ? 1 : 0,
      message: isAnomaly ? "Anomaly detected" : "Normal operation",
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

