import axios from 'axios';
import { Item } from './useTypes';

const API_URL = "http://localhost:5000";

// if (process.env.NODE_ENV !== "production") {
//   API_URL = "http://127.0.0.1:5000/api/v1";
// }

export const fetchProducts = async (): Promise<Item[]> => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Item> => {
  const response = await axios.get(`${API_URL}/api/products/${id}`);
  return response.data;
};