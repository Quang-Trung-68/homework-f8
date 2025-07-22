# Cấu trúc dự án hệ thống thi trực tuyến

## 1. Folder Structure

```
src/
├── components/           # Shared components
│   ├── common/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.styles.ts
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Sidebar.styles.ts
│   │   ├── Loading/
│   │   │   └── Loading.tsx
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.tsx
│   ├── forms/
│   │   ├── LoginForm/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginForm.types.ts
│   │   ├── RegisterForm/
│   │   │   ├── RegisterForm.tsx
│   │   │   └── RegisterForm.types.ts
│   │   └── CreateClassForm/
│   │       ├── CreateClassForm.tsx
│   │       └── CreateClassForm.types.ts
│   ├── cards/
│   │   ├── ClassCard/
│   │   │   ├── ClassCard.tsx
│   │   │   └── ClassCard.types.ts
│   │   ├── ExamCard/
│   │   │   ├── ExamCard.tsx
│   │   │   └── ExamCard.types.ts
│   │   └── QuestionCard/
│   │       ├── QuestionCard.tsx
│   │       └── QuestionCard.types.ts
│   └── modals/
│       ├── CreateExamModal/
│       │   ├── CreateExamModal.tsx
│       │   └── CreateExamModal.types.ts
│       └── QuestionModal/
│           ├── QuestionModal.tsx
│           └── QuestionModal.types.ts
├── pages/
│   ├── auth/
│   │   ├── Login/
│   │   │   ├── Login.tsx
│   │   │   └── Login.styles.ts
│   │   └── Register/
│   │       ├── Register.tsx
│   │       └── Register.styles.ts
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   └── Dashboard.styles.ts
│   ├── classes/
│   │   ├── ClassList/
│   │   │   ├── ClassList.tsx
│   │   │   └── ClassList.styles.ts
│   │   ├── ClassDetail/
│   │   │   ├── ClassDetail.tsx
│   │   │   └── ClassDetail.styles.ts
│   │   └── CreateClass/
│   │       ├── CreateClass.tsx
│   │       └── CreateClass.styles.ts
│   ├── exams/
│   │   ├── ExamList/
│   │   │   ├── ExamList.tsx
│   │   │   └── ExamList.styles.ts
│   │   ├── ExamDetail/
│   │   │   ├── ExamDetail.tsx
│   │   │   └── ExamDetail.styles.ts
│   │   ├── CreateExam/
│   │   │   ├── CreateExam.tsx
│   │   │   └── CreateExam.styles.ts
│   │   └── TakeExam/
│   │       ├── TakeExam.tsx
│   │       └── TakeExam.styles.ts
│   ├── questions/
│   │   ├── QuestionBank/
│   │   │   ├── QuestionBank.tsx
│   │   │   └── QuestionBank.styles.ts
│   │   └── CreateQuestion/
│   │       ├── CreateQuestion.tsx
│   │       └── CreateQuestion.styles.ts
│   ├── members/
│   │   ├── MemberList/
│   │   │   ├── MemberList.tsx
│   │   │   └── MemberList.styles.ts
│   │   └── MemberDetail/
│   │       ├── MemberDetail.tsx
│   │       └── MemberDetail.styles.ts
│   ├── profile/
│   │   ├── Profile.tsx
│   │   └── Profile.styles.ts
│   └── NotFound/
│       └── NotFound.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useExam.ts
│   ├── useClass.ts
│   ├── useQuestion.ts
│   └── useLocalStorage.ts
├── stores/
│   ├── authStore.ts
│   ├── classStore.ts
│   ├── examStore.ts
│   ├── questionStore.ts
│   ├── userStore.ts
│   └── index.ts
├── services/
│   ├── api.ts
│   ├── authService.ts
│   ├── classService.ts
│   ├── examService.ts
│   ├── questionService.ts
│   └── userService.ts
├── types/
│   ├── auth.types.ts
│   ├── class.types.ts
│   ├── exam.types.ts
│   ├── question.types.ts
│   ├── user.types.ts
│   └── common.types.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   ├── validation.ts
│   └── dateUtils.ts
├── styles/
│   ├── theme.ts
│   ├── globalStyles.ts
│   └── muiTheme.ts
├── router/
│   ├── AppRouter.tsx
│   ├── routes.ts
│   └── routeConfig.ts
├── App.tsx
├── index.tsx
└── setupTests.ts
```

````
Zustand-edit

src/store/
├── authStore.ts      # Thay thế authSlice
├── classStore.ts     # Thay thế classSlice
├── examStore.ts      # Thay thế examSlice
├── questionStore.ts  # Thay thế questionSlice
└── userStore.ts      # Thay thế userSlice


## 2. Router Structure (React Router DOM)

### 2.1 Route Configuration

```typescript
// src/router/routes.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CLASSES: '/classes',
  CLASS_DETAIL: '/classes/:classId',
  CREATE_CLASS: '/classes/create',
  EXAMS: '/exams',
  EXAM_DETAIL: '/exams/:examId',
  CREATE_EXAM: '/exams/create',
  TAKE_EXAM: '/exams/:examId/take',
  QUESTIONS: '/questions',
  CREATE_QUESTION: '/questions/create',
  MEMBERS: '/members',
  MEMBER_DETAIL: '/members/:memberId',
  PROFILE: '/profile',
  NOT_FOUND: '*'
};

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.HOME
];

export const PRIVATE_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.CLASSES,
  ROUTES.CLASS_DETAIL,
  ROUTES.CREATE_CLASS,
  ROUTES.EXAMS,
  ROUTES.EXAM_DETAIL,
  ROUTES.CREATE_EXAM,
  ROUTES.TAKE_EXAM,
  ROUTES.QUESTIONS,
  ROUTES.CREATE_QUESTION,
  ROUTES.MEMBERS,
  ROUTES.MEMBER_DETAIL,
  ROUTES.PROFILE
];
````

### 2.2 Main Router Component

```typescript
// src/router/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ROUTES } from "./routes";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import Layout from "../components/common/Layout/Layout";

// Auth Pages
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Classes
import ClassList from "../pages/classes/ClassList/ClassList";
import ClassDetail from "../pages/classes/ClassDetail/ClassDetail";
import CreateClass from "../pages/classes/CreateClass/CreateClass";

// Exams
import ExamList from "../pages/exams/ExamList/ExamList";
import ExamDetail from "../pages/exams/ExamDetail/ExamDetail";
import CreateExam from "../pages/exams/CreateExam/CreateExam";
import TakeExam from "../pages/exams/TakeExam/TakeExam";

// Questions
import QuestionBank from "../pages/questions/QuestionBank/QuestionBank";
import CreateQuestion from "../pages/questions/CreateQuestion/CreateQuestion";

// Members
import MemberList from "../pages/members/MemberList/MemberList";
import MemberDetail from "../pages/members/MemberDetail/MemberDetail";

// Profile
import Profile from "../pages/profile/Profile";

// Not Found
import NotFound from "../pages/NotFound/NotFound";

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Login />
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Register />
          }
        />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route
              path={ROUTES.HOME}
              element={<Navigate to={ROUTES.DASHBOARD} />}
            />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

            {/* Classes Routes */}
            <Route path={ROUTES.CLASSES} element={<ClassList />} />
            <Route path={ROUTES.CLASS_DETAIL} element={<ClassDetail />} />
            <Route path={ROUTES.CREATE_CLASS} element={<CreateClass />} />

            {/* Exams Routes */}
            <Route path={ROUTES.EXAMS} element={<ExamList />} />
            <Route path={ROUTES.EXAM_DETAIL} element={<ExamDetail />} />
            <Route path={ROUTES.CREATE_EXAM} element={<CreateExam />} />

            {/* Questions Routes */}
            <Route path={ROUTES.QUESTIONS} element={<QuestionBank />} />
            <Route path={ROUTES.CREATE_QUESTION} element={<CreateQuestion />} />

            {/* Members Routes */}
            <Route path={ROUTES.MEMBERS} element={<MemberList />} />
            <Route path={ROUTES.MEMBER_DETAIL} element={<MemberDetail />} />

            {/* Profile Route */}
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>

          {/* Take Exam Route (Full Screen) */}
          <Route path={ROUTES.TAKE_EXAM} element={<TakeExam />} />
        </Route>

        {/* Not Found Route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
```

## 3. Component Structure Details

### 3.1 Layout Component

```typescript
// src/components/common/Layout/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
```

### 3.2 Protected Route Component

```typescript
// src/components/common/ProtectedRoute/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ROUTES } from "../../../router/routes";
import Loading from "../Loading/Loading";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
```

## 4. State Management Structure (Redux Toolkit)

### 4.1 Store Configuration

```typescript
// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import classReducer from "./slices/classSlice";
import examReducer from "./slices/examSlice";
import questionReducer from "./slices/questionSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classReducer,
    exams: examReducer,
    questions: questionReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 4.2 Auth Slice Example

```typescript
// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, LoginCredentials, RegisterData } from "../../types/auth.types";
import { authService } from "../../services/authService";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData) => {
    const response = await authService.register(userData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

## 5. Navigation Structure

### 5.1 Sidebar Navigation

```typescript
// src/components/common/Sidebar/sidebarConfig.ts
import {
  Dashboard,
  Class,
  Quiz,
  QuestionAnswer,
  People,
  Person,
} from "@mui/icons-material";
import { ROUTES } from "../../../router/routes";

export interface SidebarItem {
  title: string;
  path: string;
  icon: React.ComponentType;
  roles?: string[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: Dashboard,
  },
  {
    title: "Lớp học",
    path: ROUTES.CLASSES,
    icon: Class,
  },
  {
    title: "Bài thi",
    path: ROUTES.EXAMS,
    icon: Quiz,
  },
  {
    title: "Ngân hàng câu hỏi",
    path: ROUTES.QUESTIONS,
    icon: QuestionAnswer,
    roles: ["teacher", "admin"],
  },
  {
    title: "Thành viên",
    path: ROUTES.MEMBERS,
    icon: People,
  },
  {
    title: "Hồ sơ",
    path: ROUTES.PROFILE,
    icon: Person,
  },
];
```