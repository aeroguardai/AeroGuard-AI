// utils/dataPrep.js

/**
 * Clean and prepare aircraft telemetry data
 * This will be used for predictive maintenance and anomaly detection
 */

export const prepareData = (rawData) => {
  if (!rawData) return null;

  try {
    // Remove null or undefined values
    let cleaned = Object.fromEntries(
      Object.entries(rawData).filter(([_, v]) => v !== null && v !== undefined)
    );

    // Convert strings to numbers where possible
    for (let key in cleaned) {
      if (!isNaN(cleaned[key])) {
        cleaned[key] = Number(cleaned[key]);
      }
    }

    // Add standardized fields
    cleaned.timestamp = cleaned.timestamp || new Date().toISOString();
    cleaned.health_score = calculateHealthScore(cleaned);

    return cleaned;

  } catch (err) {
    console.error("Data prep error:", err);
    return null;
  }
};

/**
 * Simple scoring function to rate aircraft health
 */
export const calculateHealthScore = (data) => {
  let score = 100;

  // Example logic (we can expand later)
  if (data.engine_temp > 850) score -= 20;
  if (data.vibration_level > 7) score -= 30;
  if (data.fuel_pressure < 40) score -= 10;
  if (data.hydraulic_pressure < 1200) score -= 15;

  return Math.max(0, score);
};

