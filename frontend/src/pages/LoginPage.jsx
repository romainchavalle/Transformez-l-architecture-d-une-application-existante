import LoginForm from '../features/auth/components/LoginForm';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <LoginForm />
      <div className="mt-4 text-sm text-gray-600">
        Pas encore de compte ?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Inscrivez-vous
        </Link>
      </div>
    </div>
  );
}
