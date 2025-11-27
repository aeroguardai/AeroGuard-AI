import { supabase } from '../config/supabaseClient.js';

export const postTelemetry = async (req, res) => {
  try {
    const { engine_temp, oil_pressure, vibration, flight_hours } = req.body;

    const { data, error } = await supabase
      .from("telemetry")
      .insert([
        {
          engine_temp,
          oil_pressure,
          vibration,
          flight_hours,
          timestamp: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getLatestTelemetry = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("telemetry")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getTelemetryHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("telemetry")
      .select("*")
      .order("timestamp", { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
