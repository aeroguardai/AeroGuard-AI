export const detectAnomaly = async (req, res) => {
  try {
    const { engine_temp, oil_pressure, vibration } = req.body;

    let anomaly = 0;

    // Simple threshold-based anomaly detection
    if (
      engine_temp > 600 ||
      oil_pressure < 38 ||
      vibration > 1.5
    ) {
      anomaly = 1;
    }

    return res.json({
      success: true,
      anomaly,
      message:
        anomaly === 1
          ? "⚠️ Anomaly detected — maintenance required!"
          : "✅ Aircraft healthy — no anomaly detected."
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Anomaly detection failed"
    });
  }
};
