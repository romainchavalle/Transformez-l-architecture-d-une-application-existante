import { useAuthStore } from '../../features/auth/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function MainLayout({ children }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
             <h1 className="text-2xl font-bold text-gray-800 tracking-tight">App Notes</h1>
             <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden md:inline">
                  Connecté en tant que <b className="text-gray-900">{user?.name || 'User'}</b>
                </span>
                <button 
                  onClick={handleLogout} 
                  className="text-sm bg-gray-100 px-4 py-2 rounded shadow-sm hover:bg-gray-200 text-gray-700 transition"
                >
                   Déconnexion
                </button>
             </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
