export function calculateRiskScore(data) {
  let score = 100;

  if (data.engine_temp > 650) score -= 30;
  if (data.engine_temp > 700) score -= 40;

  if (data.oil_pressure < 35) score -= 25;
  if (data.oil_pressure < 30) score -= 35;

  if (data.vibration > 1.5) score -= 20;
  if (data.vibration > 2.0) score -= 30;

  if (data.flight_hours > 1500) score -= 10;
  if (data.flight_hours > 2000) score -= 20;

  return Math.max(0, score);
}

