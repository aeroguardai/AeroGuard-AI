export function generateAlerts(data) {
  const alerts = [];

  if (data.engine_temp > 650)
    alerts.push("High engine temperature detected");

  if (data.oil_pressure < 35)
    alerts.push("Oil pressure dangerously low");

  if (data.vibration > 1.5)
    alerts.push("Abnormal engine vibration");

  if (alerts.length === 0)
    alerts.push("No issues detected");

  return alerts;
}

