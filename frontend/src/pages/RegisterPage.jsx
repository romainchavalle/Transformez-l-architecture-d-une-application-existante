import RegisterForm from '../features/auth/components/RegisterForm';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <RegisterForm />
      <div className="mt-4 text-sm text-gray-600">
        Déjà un compte ?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Connectez-vous
        </Link>
      </div>
    </div>
  );
}
