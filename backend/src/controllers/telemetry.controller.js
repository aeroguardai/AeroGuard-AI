import supabase from "../config/supabaseClient.js";

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
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getLatestTelemetry = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("telemetry")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.json({
        success: false,
        error: "No telemetry data found in Supabase."
      });
    }

    res.json({ success: true, data: data[0] });

    
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
