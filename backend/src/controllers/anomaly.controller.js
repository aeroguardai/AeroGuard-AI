export const detectAnomaly = async (req, res) => {
  try {
    const { engine_temp, oil_pressure, vibration, flight_hours } = req.body;

    // Simple rule-based fallback model
    const isAnomaly =
      engine_temp > 600 ||
      oil_pressure < 40 ||
      vibration > 1.5 ||
      flight_hours > 2000;

    return res.json({
      anomaly: isAnomaly ? 1 : 0,
      message: isAnomaly ? "Anomaly detected" : "Normal"
    });

  } catch (error) {
    console.error("Anomaly error:", error);
    res.status(500).json({ error: "Server error detecting anomaly" });
  }
};
