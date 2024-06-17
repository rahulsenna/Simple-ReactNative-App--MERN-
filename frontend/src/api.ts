import axios from 'axios';
import { Item } from './types';

axios.defaults.baseURL = 'http://192.168.1.100:8000/api/';

interface AuthResponse {
  token: string;
}

interface ItemsResponse {
  items: Item[];
  totalPages: number
}

export const register = async (userid: string, password: string): Promise<void> => {
  await axios.post(`users/register`, { userid, password });
};

export const login = async (userid: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`users/login`, { userid, password });
  return response.data;
};

export const updateUser = async (token: string, name: string, age: number): Promise<void> => {
  axios.defaults.headers.common['Authorization'] = token;
  await axios.put(`users/update`, { name, age });
};

export const getItems = async (token: string|null) : Promise<ItemsResponse> =>{
  if (token)
    axios.defaults.headers.common['Authorization'] = token;
  const response = await axios.get('items?page=${page}');
  return response.data;
}