// telemetry.controller.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Save new telemetry data
export const postTelemetry = async (req, res) => {
  try {
    const data = req.body;

    const { error } = await supabase
      .from('telemetry')
      .insert([data]);

    if (error) throw error;

    res.json({ success: true, message: "Telemetry stored" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get the latest telemetry reading
export const getLatestTelemetry = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('telemetry')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) throw error;

    res.json({ success: true, data: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get last 50 telemetry records (history)
export const getTelemetryHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('telemetry')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
