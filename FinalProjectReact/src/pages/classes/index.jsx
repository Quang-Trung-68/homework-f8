import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ClassIcon from "@mui/icons-material/Class";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupIcon from "@mui/icons-material/Group";
import OverviewIcon from "@mui/icons-material/Dashboard";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";

import { getClass } from "../../fetchApis";
import { useEffect } from "react";

const pages = [
  { name: "Tổng quan", icon: <OverviewIcon /> },
  { name: "Bài thi", icon: <QuizIcon /> },
  { name: "Thành viên", icon: <GroupIcon /> }
];

const settings = [
  { name: "Thông tin cá nhân", icon: <PersonIcon /> },
  { name: "Đăng xuất", icon: <LogoutIcon /> }
];



const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  }
}));

const MainContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  padding: '20px 0',
}));



function Classes() {
  const getClasses = async () => {
    const data = await getClass(localStorage.accessToken);
    console.log(data);
  };

  useEffect(() => {
    getClasses();
  }, []);

  // Sample data for demonstration
  const sampleClasses = [
    { id: 1, name: "Lập trình Web", students: 45, status: "Đang diễn ra" },
    { id: 2, name: "Cơ sở dữ liệu", students: 38, status: "Hoàn thành" },
    { id: 3, name: "Thuật toán", students: 52, status: "Sắp bắt đầu" },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <ResponsiveAppBar pages= {pages} settings = {settings} />
      
      <MainContainer maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: '#2c3e50',
              mb: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Danh sách lớp học
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Quản lý và theo dõi tiến độ các lớp học của bạn
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {sampleClasses.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem.id}>
              <StyledCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ClassIcon sx={{ color: '#667eea', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {classItem.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <GroupIcon sx={{ color: '#95a5a6', mr: 1, fontSize: '1.2rem' }} />
                    <Typography variant="body2" color="text.secondary">
                      {classItem.students} học viên
                    </Typography>
                  </Box>

                  <Chip 
                    label={classItem.status}
                    color={classItem.status === 'Đang diễn ra' ? 'success' : 
                           classItem.status === 'Hoàn thành' ? 'default' : 'warning'}
                    sx={{ 
                      borderRadius: '20px',
                      fontWeight: 500,
                    }}
                  />
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </MainContainer>
    </Box>
  );
}

export default Classes;