import axios from 'axios';
import { useAuthStore } from '../features/auth/store/useAuthStore';

// Instance dédiée pour cibler notre API Laravel
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// INTERCEPTEUR REQUEST : Injecter le Token automatiquement
axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// INTERCEPTEUR RESPONSE : Gérer les expulsions (401 Unauthorized)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const { response } = error;
      if (response && response.status === 401) {
        // Le token a expiré ou est invalide, on force la déconnexion
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    } catch (err) {
      console.error(err);
    }
    throw error;
  }
);

export default axiosClient;
