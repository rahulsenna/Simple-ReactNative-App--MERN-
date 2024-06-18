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

export const updateUser = async (name: string, age: number): Promise<void> => { 
  await axios.put(`users/update`, { name, age });
};

export const getItems = async (page: number) : Promise<ItemsResponse> =>{
  const response = await axios.get(`items?page=${page}`);
  return response.data;
}

export const setAuthToken = async (token: string) : Promise<void> =>{
  axios.defaults.headers.common['Authorization'] = token;
}

export const removeAuthToken = async () : Promise<void> =>{
  axios.defaults.headers.common['Authorization'] = '';
}