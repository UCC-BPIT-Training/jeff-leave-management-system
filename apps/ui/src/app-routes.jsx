import { AddLeave } from './pages/add-leave';
import { Home } from './pages/home';
import { UpdateLeave } from './pages/update-leave';
import { ViewLeaveList } from './pages/view-leave-list';
import { Routes, Route } from 'react-router';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ViewLeaveList />} index />
      <Route element={<AddLeave />} path="/request/new" />
      <Route element={<UpdateLeave />} path="/request/:id/edit" />
    </Routes>
  );
}
