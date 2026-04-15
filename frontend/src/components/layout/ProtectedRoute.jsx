import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

// L'équivalent exact d'un Guard Angular en mode React Moderne
export default function ProtectedRoute({ children }) {
  // On regarde dans le magasin Zustand si l'utilisateur possède un jeton
  const token = useAuthStore((state) => state.token);

  if (!token) {
    // Redirection immédiate
    return <Navigate to="/login" replace />;
  }

  // S'il a un jeton, on affiche les composants (enfants)
  return children;
}
