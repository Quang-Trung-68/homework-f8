import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useLoadingStore } from '../../../stores/loadingStore';

const GlobalLoader: React.FC = () => {
  const { isLoading, loadingMessage } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999, // Cao hơn header
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <LinearProgress 
        sx={{
          height: '3px',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#1976d2', // Màu xanh
          },
        }}
      />
      {loadingMessage && (
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Typography variant="caption" color="textSecondary">
            {loadingMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GlobalLoader;