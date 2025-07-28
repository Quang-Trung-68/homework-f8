import { Box, Button } from "@mui/material";
import logo from "../../../../public/images/logo.png"
import { Link } from "react-router-dom";
import AppsIcon from '@mui/icons-material/Apps';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useClassState } from "../../../stores/classStore";

const Sidebar = () => {
  const {classSelecting,getClass} = useClassState()
  return (
    <aside
      style={{
        width: '240px',           // Cố định chiều rộng
        minWidth: '240px',        // Đảm bảo không co lại
        height: '100vh',          // Chiều cao full màn hình
        background: '#fff',
        padding: '1.5rem',
        position: 'fixed',        // Cố định vị trí
        left: 0,                  // Dính vào bên trái
        top: 0,                   // Dính vào bên trên
        zIndex: 1000,             // Đảm bảo hiển thị trên các element khác
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)', // Thêm shadow cho đẹp
        overflowY: 'auto',         // Cho phép scroll nếu menu quá dài
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", mb: "50px" }}>
          <img width={"20%"} src={logo} />
          <Box component={"span"}>BK Classroom</Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "10px" }}>
          <Link to={`/classes/${classSelecting.id}`} >
            <Button startIcon={<AppsIcon />} fullWidth sx={{
              color: "#000", fontWeight: "bold",
              justifyContent: "flex-start",
              fontSize: "16px", textTransform: "none", textAlign: "left",
              '&:hover': {
                color: '#45b0e1',
              }
            }}>Tổng quan</Button>
          </Link>
          <Link to={`/classes/${classSelecting.id}/exams`} >
            <Button startIcon={<NoteAltIcon />} fullWidth sx={{
              color: "#000", fontWeight: "bold",
              justifyContent: "flex-start",
              fontSize: "16px", textTransform: "none",
              '&:hover': {
                color: '#45b0e1',
              }
            }}>Bài thi</Button>
          </Link>
          <Link to={`/classes/${classSelecting.id}/members`} >
            <Button startIcon={<PeopleAltIcon />} fullWidth sx={{
              color: "#000", fontWeight: "bold",
              justifyContent: "flex-start",
              fontSize: "16px", textTransform: "none",
              '&:hover': {
                color: '#45b0e1',
              }
            }}>Thành viên</Button>
          </Link>
        </Box>
      </Box>
      <Box  sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"5px",color:"#666"}} >
        <Box>@2025 Allrights reserved</Box>
        <Box>BK Star</Box>
        <Box>Version: 1.0.0</Box>
      </Box>
    </aside>
  );
};

export default Sidebar
