// anomaly.controller.js
import { supabase } from '../config/supabase.js';
import { log } from '../utils/logger.js';

// Simple rule-based anomaly detection (starter). Replace with model later.
export const detectAnomaly = async (req, res) => {
  try {
    const payload = req.body; // expect same fields as telemetry
    if (!payload) return res.status(400).json({ error: 'no payload' });

    // Very simple heuristics — tune per your dataset:
    const temp = Number(payload.engine_temp || 0);
    const vibration = Number(payload.vibration || 0);
    const pressure = Number(payload.oil_pressure || 0);

    let anomaly = false;
    let reason = [];

    if (temp > 600) { anomaly = true; reason.push('High engine temp'); }
    if (vibration > 1.5) { anomaly = true; reason.push('High vibration'); }
    if (pressure < 35) { anomaly = true; reason.push('Low oil pressure'); }

    const result = {
      anomaly,
      reasons: reason,
      score: anomaly ? 0.9 : 0.1,
      timestamp: new Date().toISOString()
    };

    // persist alert (optional)
    await supabase.from('alerts').insert([{
      ...result,
      payload,
      created_at: new Date().toISOString()
    }]);

    return res.json({ success: true, result });
  } catch (err) {
    log('detectAnomaly error ' + err);
    return res.status(500).json({ error: 'server error' });
  }
};
