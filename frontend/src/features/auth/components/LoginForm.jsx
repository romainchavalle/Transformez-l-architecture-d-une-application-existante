import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { loginCall } from '../api/authApi';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();
  // On récupère les actions du store Zustand
  const { setToken, setUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Appel HTTP via Axios
      const data = await loginCall({ email, password });
      
      // 2. Si succès : On met à jour l'état local Zustand
      // Le back Laravel (voir AuthController) renvoie { access_token, user }
      setToken(data.access_token);
      setUser(data.user);

      // 3. On expédie l'utilisateur vers son dashboard
      navigate('/');
      
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError('Identifiants incorrects.');
      } else {
        setError('Une erreur est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 p-3 rounded text-red-600 text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
