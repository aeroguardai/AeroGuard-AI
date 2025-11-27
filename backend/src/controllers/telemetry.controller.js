import dotenv from "dotenv";
import pkg from "@supabase/supabase-js";

dotenv.config();
const { createClient } = pkg;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// -----------------------------------------------
// POST /api/telemetry  → add new telemetry data
// -----------------------------------------------
export async function postTelemetry(req, res) {
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
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) return res.status(400).json({ success: false, error });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// -----------------------------------------------------
// GET /api/telemetry/latest → fetch latest telemetry row
// -----------------------------------------------------
export async function getLatestTelemetry(req, res) {
  try {
    const { data, error } = await supabase
      .from("telemetry")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);

    if (error) return res.status(400).json({ success: false, error });

    res.json({ success: true, data: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// ------------------------------------------------------------
// GET /api/telemetry/history → last 50 telemetry logs (chart)
// ------------------------------------------------------------
export async function getTelemetryHistory(req, res) {
  try {
    const { data, error } = await supabase
      .from("telemetry")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(50);

    if (error) return res.status(400).json({ success: false, error });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
