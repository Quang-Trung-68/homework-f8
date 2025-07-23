// AppRouter.tsx
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

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

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/', element: <Navigate to="/landing" /> },
      { path: '/landing', element: <LandingPage /> },
    ],
  },
  {
    element: <Layout />,
    children: [
      { path: '/classes', element: <ClassList /> },
      { path: '/classes/create', element: <CreateClass /> },
      { path: '/classes/:id', element: <ClassDetail /> },
      { path: '/exams', element: <ExamList /> },
      { path: '/exams/:id', element: <ExamDetail /> },
      { path: '/exams/create', element: <CreateExam /> },
      { path: '/profile', element: <Profile /> },
      { path: '/members', element: <MemberList /> },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
