import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetailedUser, UsersList } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Home'
      },
      {
        icon: 'people',
        path: '/users',
        label: 'Users'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/users" element={<UsersList />} />
      <Route path="/users/:id" element={<DetailedUser />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
