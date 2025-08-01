import AppRouter from "./router/AppRouter"
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // TextField customization
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontSize: '1.5rem', // Input text
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.4rem', // Label
          },
          '& .MuiFormHelperText-root': {
            fontSize: '1.2rem', // Helper text/Error
          },
        },
      },
      defaultProps: {
        autoComplete: 'off', // Tắt auto complete cho tất cả TextField
      },
    },
    
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 12,
          padding: '8px 5px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #E63946 30%, #F77F00 90%)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #388E3C 30%, #689F38 90%)',
          },
        },
        containedError: {
          background: 'linear-gradient(45deg, #F44336 30%, #FF5722 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #D32F2F 30%, #E64A19 90%)',
          },
        },
        containedWarning: {
          background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(45deg, #F57C00 30%, #FFA000 90%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
          },
        },
      },
      variants: [
        // Custom variant: Large Button
        {
          props: { variant: 'large' },
          style: {
            fontSize: '1.6rem',
            padding: '16px 40px',
            borderRadius: 16,
          },
        },
        // Custom variant: Small Button
        {
          props: { variant: 'small' },
          style: {
            fontSize: '1.2rem',
            padding: '8px 24px',
            borderRadius: 8,
          },
        },
        // Custom variant: Rounded Button
        {
          props: { variant: 'rounded' },
          style: {
            borderRadius: 50,
            padding: '12px 32px',
          },
        },
        // Custom variant: Glass Effect
        {
          props: { variant: 'glass' },
          style: {
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#333',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.35)',
              transform: 'translateY(-2px)',
            },
          },
        },
        // Custom variant: Gradient Outline
        {
          props: { variant: 'gradientOutlined' },
          style: {
            background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196F3, #21CBF3) border-box',
            border: '2px solid transparent',
            color: '#2196F3',
            '&:hover': {
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
            },
          },
        },
        // Custom variant: Neon Effect
        {
          props: { variant: 'neon' },
          style: {
            backgroundColor: 'transparent',
            border: '2px solid #00ff88',
            color: '#00ff88',
            textShadow: '0 0 10px #00ff88',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
            '&:hover': {
              backgroundColor: '#00ff88',
              color: '#000',
              boxShadow: '0 0 30px rgba(0, 255, 136, 0.6)',
              textShadow: 'none',
            },
          },
        },
        // Custom variant: Minimal
        {
          props: { variant: 'minimal' },
          style: {
            backgroundColor: 'transparent',
            color: '#666',
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              borderColor: '#bdbdbd',
              transform: 'none',
              boxShadow: 'none',
            },
          },
        },
      ],
    },

    // IconButton customization
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 12,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
            transform: 'scale(1.1)',
          },
        },
      },
    },

    // Fab (Floating Action Button) customization
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(0,0,0,0.25)',
            transform: 'translateY(-3px)',
          },
        },
      },
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
    <AppRouter/>
    <ToastContainer />
    </ThemeProvider>
  )
}

export default App
