import { Box } from "@mui/material";
import logo from "../../../../public/images/logo.png"
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', background: '#ccc', padding: '1rem' }}>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>
        <img width={"20%"} src={logo} />
        <Box component={"span"}>BK Classroom</Box>
      </Box>
      <ul>
        <li><Link to= {"/dashboard"} > Dashboard </Link></li >
        <li><Link to= {"/dashboard"} > Tổng quan </Link></li >
        <li><Link to= {"/dashboard"} > Bài thi </Link></li >
        <li><Link to= {"/dashboard"} > Thành viên </Link></li >
      </ul>
    </aside>
  );
};

export default Sidebar
