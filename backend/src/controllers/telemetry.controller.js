// telemetry.controller.js
import { supabase } from '../config/supabase.js';
import { log } from '../utils/logger.js';

// POST /api/telemetry
export const postTelemetry = async (req, res) => {
  try {
    const payload = req.body;
    // Validate minimal fields
    if (!payload || typeof payload.engine_temp === 'undefined') {
      return res.status(400).json({ error: 'invalid payload' });
    }

    const { data, error } = await supabase
      .from('telemetry')
      .insert([{ ...payload, created_at: new Date().toISOString() }]);

    if (error) {
      log(`Supabase insert error: ${error.message}`);
      return res.status(500).json({ error: 'db error' });
    }

    return res.json({ success: true, data: payload });
  } catch (err) {
    log(`postTelemetry error ${err}`);
    return res.status(500).json({ error: 'server error' });
  }
};

// GET /api/telemetry/latest
export const getLatestTelemetry = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('telemetry')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) return res.status(500).json({ error: 'db error' });
    return res.json({ success: true, data: data[0] || {} });
  } catch (err) {
    return res.status(500).json({ error: 'server error' });
  }
};

// GET /api/telemetry?limit=100
export const getTelemetryHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '200', 10);
    const { data, error } = await supabase
      .from('telemetry')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) return res.status(500).json({ error: 'db error' });
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: 'server error' });
  }
};
