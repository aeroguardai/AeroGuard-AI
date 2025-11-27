import { supabase } from '../config/supabaseClient.js';

// POST telemetry
export const postTelemetry = async (req, res) => {
  const { engine_temp, oil_pressure, vibration, flight_hours } = req.body;

  const { data, error } = await supabase
    .from('telemetry')
    .insert([
      {
        engine_temp,
        oil_pressure,
        vibration,
        flight_hours,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ success: false, error });
  }
  return res.json({ success: true, data });
};

// GET latest telemetry (ONLY ONE ROW)
export const getLatestTelemetry = async (req, res) => {
  const { data, error } = await supabase
    .from('telemetry')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .single();  // <-- THIS FIXES THE ERROR

  if (error) {
    return res.status(400).json({ success: false, error });
  }

  return res.json({ success: true, data });
};

// GET telemetry history (multiple rows)
export const getTelemetryHistory = async (req, res) => {
  const { data, error } = await supabase
    .from('telemetry')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    return res.status(400).json({ success: false, error });
  }

  return res.json({ success: true, data });
};
