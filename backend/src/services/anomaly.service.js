import { IsolationForest } from 'isolation-forest';

export const detectAnomaly = async (features) => {
  const iso = new IsolationForest();

  // Fit model with normal baseline values
  const baseline = [
    { engine_temp: 500, oil_pressure: 40, vibration: 0.5 },
    { engine_temp: 520, oil_pressure: 43, vibration: 0.6 },
    { engine_temp: 540, oil_pressure: 41, vibration: 0.7 }
  ];

  iso.fit(baseline);

  const score = iso.score(features);

  return {
    anomaly_score: score,
    anomaly: score < -0.5 ? 1 : 0
  };
};

