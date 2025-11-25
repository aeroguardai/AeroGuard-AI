import axios from 'axios';

export const callHFModel = async (prompt) => {
  const response = await axios.post(
    'https://api-inference.huggingface.co/models/meta-llama/Llama-3-8b',
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
      },
    }
  );

  return response.data[0].generated_text;
};

