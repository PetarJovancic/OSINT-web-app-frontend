import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://0.0.0.0:8000";

export const fetchScanIds = async () => {
  const response = await axios.get(`${backendUrl}/ids`);
  return response.data.ids;
};

export const fetchScanById = async (id) => {
  const response = await axios.get(`${backendUrl}/scan/${id}`);
  return response.data;
};

export const initiateScan = async (scanRequest) => {
  const response = await axios.post(`${backendUrl}/scan`, scanRequest);
  return response.data;
};
