import { Home } from './pages/home';
import { Routes, Route } from 'react-router';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Home />} index />
    </Routes>
  );
}
