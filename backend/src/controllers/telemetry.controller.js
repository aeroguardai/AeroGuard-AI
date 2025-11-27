// telemetry.controller.js

export const getTelemetry = (req, res) => {
  const data = {
    engine_temp: 590,
    oil_pressure: 40,
    vibration: 0.8,
    flight_hours: 1521,
    updated_at: new Date().toISOString(),
  };

  return res.json({
    success: true,
    data,
  });
};
