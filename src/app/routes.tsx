import { createBrowserRouter, Navigate } from 'react-router';
import { Root } from './pages/Root';
import { Login } from './pages/Login';
import { Game } from './pages/Game';
import { Profile } from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'login', Component: Login },
      { path: 'game', Component: Game },
      { path: 'profile', Component: Profile },
      { path: '*', element: <Navigate to="/login" replace /> },
    ],
  },
]);
