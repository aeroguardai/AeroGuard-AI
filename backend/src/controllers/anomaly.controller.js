export const detectAnomaly = async (req, res) => {
  try {
    const { engine_temp, oil_pressure, vibration, flight_hours } = req.body;

    if (
      engine_temp === undefined ||
      oil_pressure === undefined ||
      vibration === undefined ||
      flight_hours === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // RULE-BASED ANOMALY PREDICTOR
    let anomaly = 0;
    let message = "Aircraft is healthy.";

    // CRITICAL ANOMALY → anomaly = 1
    if (
      engine_temp > 600 ||
      oil_pressure < 40 ||
      vibration > 1.5
    ) {
      anomaly = 1;
      message = "Critical anomaly detected! Immediate maintenance required.";
    }

    return res.json({
      anomaly,
      message,
      received: { engine_temp, oil_pressure, vibration, flight_hours },
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
