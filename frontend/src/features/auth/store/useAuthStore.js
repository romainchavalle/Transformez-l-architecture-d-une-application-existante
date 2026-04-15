import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  // Au démarrage, on vérifie si un token est déjà dans le localStorage
  token: localStorage.getItem('ACCESS_TOKEN') || null,
  user: null,

  // Action pour enregistrer ou supprimer le token
  setToken: (token) => {
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
    set({ token });
  },

  setUser: (user) => {
    set({ user });
  },

  // Action de déconnexion globale
  logout: () => {
    localStorage.removeItem('ACCESS_TOKEN');
    set({ token: null, user: null });
  }
}));
