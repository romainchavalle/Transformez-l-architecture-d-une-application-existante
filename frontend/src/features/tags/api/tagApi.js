import axiosClient from '../../../api/axiosClient';

export const fetchTagsCall = async () => {
  const response = await axiosClient.get('/tags');
  return response.data.data;
};

export const createTagCall = async (name) => {
  const response = await axiosClient.post('/tags', { name });
  return response.data.data;
};
