export const getTelemetry = (req, res) => {
  try {
    // Sample mock telemetry values
    const data = {
      engine_temp: 590,
      oil_pressure: 40,
      vibration: 0.8,
      flight_hours: 1521,
      updated_at: new Date().toISOString()
    };

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
