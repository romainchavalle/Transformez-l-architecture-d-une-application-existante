import { useState } from 'react';
import { useTagStore } from '../store/useTagStore';

export default function TagForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const addTag = useTagStore((state) => state.addTag);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!name.trim()) return;

    try {
      await addTag(name);
      setName('');
      setMessage('Tag created successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    }
  };

  return (
    <div className="space-y-4">
      {message && <div className="text-green-600 text-sm">{message}</div>}

      <h2 className="text-xl font-bold">Add a tag</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input 
          type="text" 
          placeholder="New tag name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-1 text-sm w-full" 
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600">
          Add Tag
        </button>
      </form>

      {error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  );
}
