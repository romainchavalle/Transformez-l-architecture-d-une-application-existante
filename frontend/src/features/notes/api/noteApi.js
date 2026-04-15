import axiosClient from '../../../api/axiosClient';

export const fetchNotesCall = async () => {
  const response = await axiosClient.get('/notes');
  return response.data.data;
};

export const createNoteCall = async (data) => {
  const response = await axiosClient.post('/notes', data);
  return response.data.data;
};

export const deleteNoteCall = async (id) => {
  await axiosClient.delete(`/notes/${id}`);
};
