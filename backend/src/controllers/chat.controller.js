import axios from 'axios';

export const askModel = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-3-8b',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data[0].generated_text });
  } catch (error) {
    res.status(500).json({ error: 'AI model error' });
  }
};

