import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

interface AuthResponse {
  token: string;
}

export const register = async (userid: string, password: string): Promise<void> => {
  await axios.post(`${API_URL}/register`, { userid, password });
};

export const login = async (userid: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, { userid, password });
  return response.data;
};

export const updateUser = async (token: string, name: string, age: number): Promise<void> => {
  await axios.put(`${API_URL}/update`, { token, name, age });
};
