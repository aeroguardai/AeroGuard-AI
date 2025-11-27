import { supabase } from '../config/supabaseClient.js';

// ✅ Store incoming telemetry
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
        created_at: new Date().toISOString()
      }
    ]);

  if (error) return res.status(400).json({ success: false, error: error.message });
  res.json({ success: true, data });
};

// ✅ Fetch latest telemetry record
export const getLatestTelemetry = async (req, res) => {
  const { data, error } = await supabase
    .from('telemetry')
    .select('*')
    .order('id', { ascending: false })
    .limit(1);

  if (error) return res.status(400).json({ success: false, error: error.message });

  res.json({
    success: true,
    data: data.length ? data[0] : null
  });
};

// ✅ Fetch history (optional)
export const getTelemetryHistory = async (req, res) => {
  const { data, error } = await supabase
    .from('telemetry')
    .select('*')
    .order('id', { ascending: false })
    .limit(50);

  if (error) return res.status(400).json({ success: false, error: error.message });
  res.json({ success: true, data });
};
