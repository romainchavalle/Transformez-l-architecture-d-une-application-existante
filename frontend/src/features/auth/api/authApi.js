import axiosClient from '../../../api/axiosClient';

export const loginCall = async (credentials) => {
  const response = await axiosClient.post('/login', credentials);
  return response.data;
};

export const registerCall = async (data) => {
  const response = await axiosClient.post('/register', data);
  return response.data;
};
