// backend/src/controllers/telemetry.controller.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// POST: store telemetry
export const postTelemetry = async (req, res) => {
  try {
    const data = req.body;

    const { error } = await supabase
      .from('telemetry')
      .insert([
        {
          engine_temp: data.engine_temp,
          oil_pressure: data.oil_pressure,
          vibration: data.vibration,
          flight_hours: data.flight_hours,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) return res.status(500).json({ success: false, message: error.message });

    res.json({ success: true, message: "Telemetry stored" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: fetch latest telemetry
export const getLatestTelemetry = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('telemetry')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) return res.status(500).json({ success: false, message: error.message });

    res.json({ success: true, data: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET: full telemetry history
export const getTelemetryHistory = async (req, res) => {
  try {
    const { data, error } = await supabase.from('telemetry').select('*').order('created_at', { ascending: false });

    if (error) return res.status(500).json({ success: false, message: error.message });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
