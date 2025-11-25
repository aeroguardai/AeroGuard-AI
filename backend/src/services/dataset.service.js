import axios from "axios";

export const loadDataset = async () => {
  const url = "https://huggingface.co/datasets/aiAeroGuard/Aeroguard-Dataset/resolve/main/prepared_dataset.json";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("Error loading dataset:", err);
    return [];
  }
};

