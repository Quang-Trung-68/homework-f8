import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout/Layout';
import AuthLayout from '../components/common/Layout/AuthLayout';
import LandingPage from '../pages/landing/LandingPage';
import Login from '../pages/auth/Login/Login';
import Register from '../pages/auth/Register/Register';
import ClassList from '../pages/classes/ClassList/ClassList';
import CreateClass from '../pages/classes/CreateClass/CreateClass';
import ClassDetail from '../pages/classes/ClassDetail/ClassDetail';
import ExamList from '../pages/exams/ExamList/ExamList';
import ExamDetail from '../pages/exams/ExamDetail/ExamDetail';
import CreateExam from '../pages/exams/CreateExam/CreateExam';
import Profile from '../pages/profile/Profile';
import MemberList from '../pages/members/MemberList/MemberList';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<LandingPage />} />
        </Route>
        {/* Layout pages */}
        <Route element={<Layout />}>
          <Route path="/classlist" element={<ClassList />} />
          <Route path="/createclass" element={<CreateClass />} />
          <Route path="/classdetail" element={<ClassDetail />} />
          <Route path="/examlist" element={<ExamList />} />
          <Route path="/examdetail" element={<ExamDetail />} />
          <Route path="/createexam" element={<CreateExam />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/memberlist" element={<MemberList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
