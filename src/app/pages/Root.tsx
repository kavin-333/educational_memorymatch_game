import { Outlet } from 'react-router';
import { AuthProvider } from '../contexts/AuthContext';

export function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Outlet />
      </div>
    </AuthProvider>
  );
}
