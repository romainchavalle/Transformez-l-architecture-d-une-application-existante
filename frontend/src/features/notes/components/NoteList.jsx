import { useEffect } from 'react';
import { useNoteStore } from '../store/useNoteStore';
import NoteItem from './NoteItem';

export default function NoteList() {
  const { notes, isLoading, fetchNotes } = useNoteStore();

  // Se lance silencieusement au démarrage
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Notes</h2>
      
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500 italic">No notes found.</p>
      ) : (
        notes.map(note => (
          <NoteItem key={note.id} note={note} />
        ))
      )}
    </div>
  );
}
