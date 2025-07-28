import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../Header/Header';

const MainLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box
                >
                    <Header />
                </Box>
                <Box component="main" sx={{
                    marginLeft: "30px",
                    marginRight: "30px",
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

export default MainLayout;