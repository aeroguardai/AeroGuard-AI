import axios from "axios";

export const detectAnomaly = async (req, res) => {
  try {
    const telemetry = req.body;

    // Send data to your HF model
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/aiAeroGuard/Aeroguard-Model",
      telemetry,
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        },
        timeout: 5000
      }
    );

    const prediction = response.data?.anomaly ?? 0;

    res.json({
      success: true,
      anomaly: prediction,
      message:
        prediction === 1
          ? "⚠️ Anomaly detected — maintenance required!"
          : "✅ Aircraft healthy — no anomaly detected."
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: "Model inference failed"
    });
  }
};
