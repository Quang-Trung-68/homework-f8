import { Box, Button } from "@mui/material";
import logo from "@/assets/images/logo.png"
import { Link, useLocation } from "react-router-dom";
import AppsIcon from '@mui/icons-material/Apps';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useClassState } from "../../../stores/classStore";

export const Sidebar = () => {
  const {classSelecting, getClass} = useClassState()
  const location = useLocation(); // Lấy đường dẫn hiện tại
  
  // Hàm kiểm tra active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        background: '#fff',
        padding: '1.5rem',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", mb: "50px" }}>
          <img width={"20%"} src={logo} />
          <Box component={"span"} sx={{fontWeight:"bold", fontSize:"2rem"}}>BK Classroom</Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "10px" }}>
          
          {/* Tổng quan */}
          <Link to={`/classes/${classSelecting.id}`} style={{ textDecoration: 'none' }}>
            <Button 
              startIcon={<AppsIcon />} 
              fullWidth 
              sx={{
                color: isActive(`/classes/${classSelecting.id}`) ? '#45b0e1' : "#000",
                fontWeight: "bold",
                justifyContent: "flex-start",
                fontSize: "1.6rem", 
                textTransform: "none", 
                textAlign: "left",
                borderLeft: isActive(`/classes/${classSelecting.id}`) ? '4px solid #45b0e1' : '4px solid transparent',
                borderRadius: 0,
                paddingLeft: '16px',
                backgroundColor: isActive(`/classes/${classSelecting.id}`) ? 'rgba(69, 176, 225, 0.1)' : 'transparent',
                '&:hover': {
                  color: '#45b0e1',
                  backgroundColor: 'rgba(69, 176, 225, 0.05)',
                }
              }}
            >
              Tổng quan
            </Button>
          </Link>

          {/* Bài thi */}
          <Link to={`/classes/${classSelecting.id}/exams`} style={{ textDecoration: 'none' }}>
            <Button 
              startIcon={<NoteAltIcon />} 
              fullWidth 
              sx={{
                color: isActive(`/classes/${classSelecting.id}/exams`) ? '#45b0e1' : "#000",
                fontWeight: "bold",
                justifyContent: "flex-start",
                fontSize: "1.6rem", 
                textTransform: "none",
                borderLeft: isActive(`/classes/${classSelecting.id}/exams`) ? '4px solid #45b0e1' : '4px solid transparent',
                borderRadius: 0,
                paddingLeft: '16px',
                backgroundColor: isActive(`/classes/${classSelecting.id}/exams`) ? 'rgba(69, 176, 225, 0.1)' : 'transparent',
                '&:hover': {
                  color: '#45b0e1',
                  backgroundColor: 'rgba(69, 176, 225, 0.05)',
                }
              }}
            >
              Bài thi
            </Button>
          </Link>

          {/* Thành viên */}
          <Link to={`/classes/${classSelecting.id}/members`} style={{ textDecoration: 'none' }}>
            <Button 
              startIcon={<PeopleAltIcon />} 
              fullWidth 
              sx={{
                color: isActive(`/classes/${classSelecting.id}/members`) ? '#45b0e1' : "#000",
                fontWeight: "bold",
                justifyContent: "flex-start",
                fontSize: "1.6rem", 
                textTransform: "none",
                borderLeft: isActive(`/classes/${classSelecting.id}/members`) ? '4px solid #45b0e1' : '4px solid transparent',
                borderRadius: 0,
                paddingLeft: '16px',
                backgroundColor: isActive(`/classes/${classSelecting.id}/members`) ? 'rgba(69, 176, 225, 0.1)' : 'transparent',
                '&:hover': {
                  color: '#45b0e1',
                  backgroundColor: 'rgba(69, 176, 225, 0.05)',
                }
              }}
            >
              Thành viên
            </Button>
          </Link>

        </Box>
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", color: "#666", fontSize:"1.4rem"}}>
        <Box>@2025 Allrights reserved</Box>
        <Box>BK Star</Box>
        <Box>Version: 1.0.0</Box>
      </Box>
    </aside>
  );
};

export default Sidebar;