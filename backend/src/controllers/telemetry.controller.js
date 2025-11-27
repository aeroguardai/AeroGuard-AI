// telemetry.controller.js

// Dummy live aircraft telemetry (replace with real DB later)
export const getTelemetry = (req, res) => {
  const telemetryData = {
    engine_temp: 620,
    vibration: 1.2,
    oil_pressure: 40,
    flight_hours: 1520.5,
    status: "Nominal",
    timestamp: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    data: telemetryData
  });
};
