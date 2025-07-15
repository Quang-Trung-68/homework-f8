import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{
          flexGrow: 1, p: 3, marginLeft: '240px', // Cố định margin left = width của sidebar
          marginTop: '10px',   // Cố định margin top = height của header
          minHeight: 'calc(100vh - 64px)', // Đảm bảo outlet chiếm hết chiều cao còn lại
          overflow: 'auto'     // Cho phép scroll nếu nội dung quá dài
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;