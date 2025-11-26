// simple example returning last N rows from an in-memory array or DB
import { supabase } from '../config/supabase.js';

export const getLatestTelemetry = async (req, res) => {
  try {
    // if you saved telemetry in supabase table 'telemetry', query last 200 rows:
    const { data, error } = await supabase
      .from('telemetry')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(200);
    if (error) return res.status(500).json({ error: error.message });
    // send newest-first -> we want oldest-first in UI, so reverse and return
    res.json((data || []).reverse());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

