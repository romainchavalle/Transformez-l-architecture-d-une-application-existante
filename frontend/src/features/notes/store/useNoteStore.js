import { create } from 'zustand';
import { fetchNotesCall, createNoteCall, deleteNoteCall } from '../api/noteApi';

export const useNoteStore = create((set) => ({
  notes: [],
  isLoading: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchNotesCall();
      set({ notes: data });
    } catch (e) {
      console.error("Erreur de récupération des notes", e);
    } finally {
      set({ isLoading: false });
    }
  },

  addNote: async (noteData) => {
    try {
      const newNote = await createNoteCall(noteData);
      set((state) => ({ notes: [...state.notes, newNote] }));
      return true;
    } catch (e) {
      throw e;
    }
  },

  removeNote: async (id) => {
    try {
      // Met à jour l'interface instantanément (Optimistic UI)
      set((state) => ({ notes: state.notes.filter(n => n.id !== id) }));
      await deleteNoteCall(id);
    } catch (e) {
      // Si le serveur a planté, on rafraîchit pour remettre la note
      const data = await fetchNotesCall();
      set({ notes: data });
      console.error(e);
    }
  }
}));
