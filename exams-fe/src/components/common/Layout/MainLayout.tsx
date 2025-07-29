import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../Header/Header';

const MainLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header - fixed */}
                <Box
                    sx={{ 
                        position: "fixed", 
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 999,
                        height: '64px', // Định rõ height của header
                        backgroundColor: 'white' // Đảm bảo có background
                    }}
                >
                    <Header />
                </Box>
                
                {/* Main content - relative positioning */}
                <Box 
                    component="main" 
                    sx={{
                        marginLeft: "30px",
                        marginRight: "30px",
                        marginTop: '74px',   // 64px (header height) + 10px = 74px
                        minHeight: 'calc(100vh - 74px)', // Trừ đi margin top
                        overflow: 'auto',    // Cho phép scroll nếu nội dung quá dài
                        position: 'relative', // Thay đổi từ static sang relative
                        zIndex: 1 // Đảm bảo nằm dưới header nhưng vẫn tương tác được
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;