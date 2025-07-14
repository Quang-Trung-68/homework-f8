import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout/Layout';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login/Login';
import Register from '../pages/auth/Register/Register';
import ClassList from '../pages/classes/ClassList/ClassList';
import CreateClass from '../pages/classes/CreateClass/CreateClass';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout bao ngoài các trang */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/classlist" element={<ClassList />} />
          <Route path="/createclass" element={<CreateClass />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
