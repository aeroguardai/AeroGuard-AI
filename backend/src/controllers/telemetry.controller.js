export const getTelemetry = (req, res) => {
  try {
    const sampleData = {
      engine_temp: 580 + Math.random() * 40,
      oil_pressure: 40 + Math.random() * 5,
      vibration: 0.5 + Math.random() * 1.5,
      timestamp: new Date().toISOString()
    };

    res.json(sampleData);

  } catch (err) {
    console.error("Telemetry Error:", err);
    res.status(500).json({ error: "Telemetry fetch failed" });
  }
};
