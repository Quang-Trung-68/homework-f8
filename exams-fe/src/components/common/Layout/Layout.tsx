import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import GlobalLoader from '../GlobalLoader/GlobalLoader';

 const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <GlobalLoader/>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header - fixed */}
        <Box
          sx={{ 
            paddingLeft: "240px", 
            position: "fixed", 
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            height: '80px' // Định rõ height
          }}
        >
          <Header />
        </Box>
        
        {/* Main content - relative positioning */}
        <Box 
          component="main" 
          sx={{
            flexGrow: 1, 
            p: 3, 
            marginLeft: '240px', // Cố định margin left = width của sidebar
            marginTop: '80px',   // Cố định margin top = height của header
            minHeight: 'calc(100vh - 80px)', // Đảm bảo outlet chiếm hết chiều cao còn lại
            overflow: 'auto',    // Cho phép scroll nếu nội dung quá dài
            position: 'relative', // Thay đổi từ absolute sang relative
            zIndex: 1 // Đảm bảo nằm dưới header nhưng vẫn tương tác được
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
