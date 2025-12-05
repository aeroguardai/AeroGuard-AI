import axios from "axios";
import supabase from "../config/supabaseClient.js";

export const systemHealth = async (req, res) => {
  return res.json({
    status: "online",
    service: "AeroGuard Backend",
    timestamp: new Date().toISOString()
  });
};

export const telemetryStatus = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("telemetry")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        error: "Supabase query failed"
      });
    }

    if (!data || data.length === 0) {
      return res.json({
        success: true,
        telemetry_available: false,
        message: "No telemetry data found"
      });
    }

    return res.json({
      success: true,
      telemetry_available: true,
      latest_record: data[0]
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

export const anomalyModelStatus = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-inference.huggingface.co/status/aiAeroGuard/Aeroguard-Model"
    );

    return res.json({
      success: true,
      model_status: response.data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Model is offline or not reachable"
    });
  }
};

