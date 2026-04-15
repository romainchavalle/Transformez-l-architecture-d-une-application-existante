import { useNoteStore } from '../store/useNoteStore';

export default function NoteItem({ note }) {
  const removeNote = useNoteStore((state) => state.removeNote);

  return (
    <div className="border p-3 flex justify-between items-start mt-2 bg-gray-50 rounded">
      <div>
        <p className="text-gray-800">{note.text}</p>
        <small className="text-gray-500">
          Tag: <span className="font-semibold">{note.tag?.name ?? '—'}</span>
        </small>
      </div>
      <button 
        onClick={() => removeNote(note.id)} 
        className="text-red-500 text-sm hover:underline hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
