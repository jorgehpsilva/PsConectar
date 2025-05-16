import axios from 'axios';

const API_URL = 'http://localhost:3001'; // URL do backend

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  register: async (dto: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/register`, dto);
    return response.data;
  },
};


