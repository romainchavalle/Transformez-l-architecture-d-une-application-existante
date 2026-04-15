import { useState, useEffect } from 'react';
import { useNoteStore } from '../store/useNoteStore';
import { useTagStore } from '../../tags/store/useTagStore';

export default function NoteForm() {
  const [text, setText] = useState('');
  const [tagId, setTagId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const addNote = useNoteStore((state) => state.addNote);
  const { tags, fetchTags } = useTagStore();

  useEffect(() => {
    fetchTags(); // On s'assure d'avoir les tags pour le menu déroulant
  }, [fetchTags]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!text.trim() || !tagId) {
      setError('Please provide text and choose a tag.');
      return;
    }

    try {
      await addNote({ text, tag_id: parseInt(tagId) });
      setText('');
      setTagId('');
      setMessage('Note added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving note.');
    }
  };

  return (
    <div className="space-y-4">
      {message && <div className="text-green-600 text-sm">{message}</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea 
          placeholder="Write your note..." 
          className="w-full border p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {tags.length > 0 && (
            <select 
              className="w-full border p-2 rounded bg-white"
              value={tagId}
              onChange={(e) => setTagId(e.target.value)}
            >
              <option value="">-- Select Tag --</option>
              {tags.map(tag => (
                 <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
        )}

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm">
          Add Note
        </button>
      </form>
    </div>
  );
}
