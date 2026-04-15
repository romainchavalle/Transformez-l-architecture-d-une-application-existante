import { create } from 'zustand';
import { fetchTagsCall, createTagCall } from '../api/tagApi';

export const useTagStore = create((set) => ({
  tags: [],
  isLoading: false,

  fetchTags: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchTagsCall();
      set({ tags: data });
    } catch (e) {
      console.error("Erreur de récupération des tags", e);
    } finally {
      set({ isLoading: false });
    }
  },

  addTag: async (name) => {
    try {
      const newTag = await createTagCall(name);
      set((state) => ({ tags: [...state.tags, newTag] }));
      return true;
    } catch (e) {
      throw e;
    }
  }
}));
