# Hướng dẫn sử dụng Zustand cho hệ thống thi trực tuyến

## 1. Cài đặt và Setup

### 1.1 Cài đặt Zustand
```bash
npm install zustand
# hoặc
yarn add zustand
```

### 1.2 Cấu trúc thư mục mới
```
src/
├── stores/
│   ├── authStore.ts
│   ├── classStore.ts
│   ├── examStore.ts
│   ├── questionStore.ts
│   ├── userStore.ts
│   └── index.ts
├── types/
│   └── (giữ nguyên)
├── services/
│   └── (giữ nguyên)
└── hooks/
    ├── useAuthStore.ts (optional)
    └── useStores.ts (optional)
```

## 2. Tạo Auth Store

### 2.1 Auth Store - authStore.ts
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '../types/auth.types';
import { authService } from '../services/authService';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  getCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.login(credentials);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({
            error: error.message || 'Đăng nhập thất bại',
            loading: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.register(userData);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({
            error: error.message || 'Đăng ký thất bại',
            loading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      setLoading: (loading) => set({ loading }),

      getCurrentUser: async () => {
        const { token } = get();
        if (!token) return;
        
        set({ loading: true });
        try {
          const user = await authService.getCurrentUser();
          set({ user, loading: false });
        } catch (error) {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            loading: false 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

## 3. Tạo Class Store

### 3.1 Class Store - classStore.ts
```typescript
import { create } from 'zustand';
import { Class, CreateClassData } from '../types/class.types';
import { classService } from '../services/classService';

interface ClassState {
  // State
  classes: Class[];
  currentClass: Class | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchClasses: () => Promise<void>;
  fetchClassById: (id: string) => Promise<void>;
  createClass: (data: CreateClassData) => Promise<void>;
  updateClass: (id: string, data: Partial<Class>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  joinClass: (classCode: string) => Promise<void>;
  leaveClass: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
  // Initial state
  classes: [],
  currentClass: null,
  loading: false,
  error: null,

  // Actions
  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      const classes = await classService.getClasses();
      set({ classes, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchClassById: async (id) => {
    set({ loading: true, error: null });
    try {
      const currentClass = await classService.getClassById(id);
      set({ currentClass, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createClass: async (data) => {
    set({ loading: true, error: null });
    try {
      const newClass = await classService.createClass(data);
      set((state) => ({
        classes: [...state.classes, newClass],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateClass: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updatedClass = await classService.updateClass(id, data);
      set((state) => ({
        classes: state.classes.map((cls) =>
          cls.id === id ? updatedClass : cls
        ),
        currentClass: state.currentClass?.id === id ? updatedClass : state.currentClass,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteClass: async (id) => {
    set({ loading: true, error: null });
    try {
      await classService.deleteClass(id);
      set((state) => ({
        classes: state.classes.filter((cls) => cls.id !== id),
        currentClass: state.currentClass?.id === id ? null : state.currentClass,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  joinClass: async (classCode) => {
    set({ loading: true, error: null });
    try {
      const joinedClass = await classService.joinClass(classCode);
      set((state) => ({
        classes: [...state.classes, joinedClass],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  leaveClass: async (id) => {
    set({ loading: true, error: null });
    try {
      await classService.leaveClass(id);
      set((state) => ({
        classes: state.classes.filter((cls) => cls.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
```

## 4. Tạo Exam Store

### 4.1 Exam Store - examStore.ts
```typescript
import { create } from 'zustand';
import { Exam, CreateExamData, ExamSubmission } from '../types/exam.types';
import { examService } from '../services/examService';

interface ExamState {
  // State
  exams: Exam[];
  currentExam: Exam | null;
  examResults: ExamSubmission[];
  loading: boolean;
  error: string | null;
  
  // Exam taking state
  isExamActive: boolean;
  currentQuestionIndex: number;
  answers: Record<string, any>;
  timeRemaining: number;
  
  // Actions
  fetchExams: () => Promise<void>;
  fetchExamById: (id: string) => Promise<void>;
  createExam: (data: CreateExamData) => Promise<void>;
  updateExam: (id: string, data: Partial<Exam>) => Promise<void>;
  deleteExam: (id: string) => Promise<void>;
  
  // Exam taking actions
  startExam: (examId: string) => Promise<void>;
  submitExam: (examId: string, answers: Record<string, any>) => Promise<void>;
  saveAnswer: (questionId: string, answer: any) => void;
  setCurrentQuestion: (index: number) => void;
  setTimeRemaining: (time: number) => void;
  endExam: () => void;
  
  clearError: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  // Initial state
  exams: [],
  currentExam: null,
  examResults: [],
  loading: false,
  error: null,
  
  // Exam taking state
  isExamActive: false,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,

  // Actions
  fetchExams: async () => {
    set({ loading: true, error: null });
    try {
      const exams = await examService.getExams();
      set({ exams, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchExamById: async (id) => {
    set({ loading: true, error: null });
    try {
      const currentExam = await examService.getExamById(id);
      set({ currentExam, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createExam: async (data) => {
    set({ loading: true, error: null });
    try {
      const newExam = await examService.createExam(data);
      set((state) => ({
        exams: [...state.exams, newExam],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateExam: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updatedExam = await examService.updateExam(id, data);
      set((state) => ({
        exams: state.exams.map((exam) =>
          exam.id === id ? updatedExam : exam
        ),
        currentExam: state.currentExam?.id === id ? updatedExam : state.currentExam,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteExam: async (id) => {
    set({ loading: true, error: null });
    try {
      await examService.deleteExam(id);
      set((state) => ({
        exams: state.exams.filter((exam) => exam.id !== id),
        currentExam: state.currentExam?.id === id ? null : state.currentExam,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Exam taking actions
  startExam: async (examId) => {
    set({ loading: true, error: null });
    try {
      const exam = await examService.startExam(examId);
      set({
        currentExam: exam,
        isExamActive: true,
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: exam.duration * 60, // Convert minutes to seconds
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  submitExam: async (examId, answers) => {
    set({ loading: true, error: null });
    try {
      const result = await examService.submitExam(examId, answers);
      set({
        isExamActive: false,
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: 0,
        loading: false,
      });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  saveAnswer: (questionId, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    }));
  },

  setCurrentQuestion: (index) => {
    set({ currentQuestionIndex: index });
  },

  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },

  endExam: () => {
    set({
      isExamActive: false,
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: 0,
    });
  },

  clearError: () => set({ error: null }),
}));
```

## 5. Sử dụng Zustand trong Components

### 5.1 Login Component
```typescript
// src/pages/auth/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { Button, TextField, Box, Alert } from '@mui/material';
import { ROUTES } from '../../../router/routes';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      // Error đã được handle trong store
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mật khẩu"
        type="password"
        id="password"
        autoComplete="current-password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
    </Box>
  );
};

export default Login;
```

### 5.2 Class List Component
```typescript
// src/pages/classes/ClassList/ClassList.tsx
import React, { useEffect } from 'react';
import { useClassStore } from '../../../stores/classStore';
import { useAuthStore } from '../../../stores/authStore';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import ClassCard from '../../../components/cards/ClassCard/ClassCard';

const ClassList: React.FC = () => {
  const { 
    classes, 
    loading, 
    error, 
    fetchClasses, 
    clearError 
  } = useClassStore();
  
  const { user } = useAuthStore();

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleCreateClass = () => {
    // Navigate to create class page
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Lớp học của tôi
        </Typography>
        {user?.role === 'teacher' && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateClass}
          >
            Tạo lớp học
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {classes.map((classItem) => (
          <Grid item xs={12} sm={6} md={4} key={classItem.id}>
            <ClassCard class={classItem} />
          </Grid>
        ))}
      </Grid>

      {classes.length === 0 && !loading && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            Chưa có lớp học nào
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ClassList;
```

### 5.3 Take Exam Component
```typescript
// src/pages/exams/TakeExam/TakeExam.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExamStore } from '../../../stores/examStore';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  LinearProgress,
  Alert,
} from '@mui/material';
import QuestionCard from '../../../components/cards/QuestionCard/QuestionCard';

const TakeExam: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const {
    currentExam,
    isExamActive,
    currentQuestionIndex,
    answers,
    timeRemaining,
    loading,
    error,
    startExam,
    submitExam,
    saveAnswer,
    setCurrentQuestion,
    setTimeRemaining,
    endExam,
  } = useExamStore();

  // Timer effect
  useEffect(() => {
    if (isExamActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && isExamActive) {
      handleSubmit();
    }
  }, [isExamActive, timeRemaining]);

  const handleStartExam = async () => {
    if (examId) {
      await startExam(examId);
    }
  };

  const handleSubmit = async () => {
    if (examId) {
      try {
        await submitExam(examId, answers);
        navigate('/exams');
      } catch (error) {
        // Error handled in store
      }
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    saveAnswer(questionId, answer);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (!isExamActive) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {currentExam?.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {currentExam?.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Thời gian: {currentExam?.duration} phút
          </Typography>
          <Typography variant="h6" gutterBottom>
            Số câu hỏi: {currentExam?.questions?.length}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartExam}
            disabled={loading}
          >
            Bắt đầu làm bài
          </Button>
        </Paper>
      </Container>
    );
  }

  const currentQuestion = currentExam?.questions?.[currentQuestionIndex];

  return (
    <Container maxWidth="md">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">
            Câu {currentQuestionIndex + 1} / {currentExam?.questions?.length}
          </Typography>
          <Typography variant="h6" color="error">
            {formatTime(timeRemaining)}
          </Typography>
        </Box>

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        )}

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="outlined"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestion(currentQuestionIndex - 1)}
          >
            Câu trước
          </Button>
          
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Nộp bài
          </Button>
          
          <Button
            variant="outlined"
            disabled={currentQuestionIndex === (currentExam?.questions?.length || 0) - 1}
            onClick={() => setCurrentQuestion(currentQuestionIndex + 1)}
          >
            Câu tiếp
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TakeExam;
```

## 6. Protected Route với Zustand

### 6.1 Updated Protected Route
```typescript
// src/components/common/ProtectedRoute/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { ROUTES } from '../../../router/routes';
import Loading from '../Loading/Loading';

const ProtectedRoute: React.FC = () => {
  const { 
    isAuthenticated, 
    loading, 
    token, 
    getCurrentUser 
  } = useAuthStore();

  useEffect(() => {
    if (token && !isAuthenticated) {
      getCurrentUser();
    }
  }, [token, isAuthenticated, getCurrentUser]);

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
```

## 7. Custom Hooks (Optional)

### 7.1 useAuth Hook
```typescript
// src/hooks/useAuth.ts
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const auth = useAuthStore();
  
  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
    clearError: auth.clearError,
  };
};
```

## 8. Middleware và Devtools

### 8.1 Thêm Devtools
```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // ... store implementation
      }),
      {
        name: 'auth-storage',
      }
    ),
    {
      name: 'auth-store',
    }
  )
);
```

### 8.2 Immer Middleware (cho complex state updates)
```bash
npm install immer
```

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useExamStore = create<ExamState>()(
  immer((set, get) => ({
    // Initial state
    exams: [],
    
    // Action với immer
    updateExam: async (id, data) => {
      set((state) => {
        const index = state.exams.findIndex(exam => exam.id === id);
        if (index !== -1) {
          state.exams[index] = { ...state.exams[index], ...data };
        }
      });
    },
  }))
);
```

## 9. Migration từ Redux

### 9.1 Các bước migrate
1. Cài đặt Zustand
2. Tạo stores mới theo pattern trên
3. Thay thế useSelector bằng store hooks
4. Thay thế useDispatch bằng store actions
5. Remove Redux boilerplate
6. Test thoroughly

### 9.2 So sánh code
**Trước (Redux):**
```typescript
// Component
const { user, loading } = useSelector((state: RootState) => state.auth);
const dispatch = useDispatch();

const handleLogin = async (credentials) => {
  dispatch(loginAsync(credentials));
};
```

**Sau (Zustand):**
```typescript
// Component
const { user, loading, login } = useAuthStore();

const handleLogin = async (credentials) => {
  await login(credentials);
};
```

## 10. Best Practices

### 10.1 Tổ chức stores
- Tách biệt concerns (auth, classes, exams)
- Sử dụng TypeScript đầy đủ
- Persist chỉ data cần thiết
- Handle errors trong stores

### 10.2 Performance
- Sử dụng selectors cho complex computations
- Avoid unnecessary re-renders
- Use shallow comparison khi cần

### 10.3 Testing
```typescript
// src/stores/__tests__/authStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../authStore';

describe('Auth Store', () => {
  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password'
      });
    });
    
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

Zustand sẽ giúp bạn giảm đáng kể boilerplate code và tăng tốc độ development cho dự án hệ thống thi trực tuyến!