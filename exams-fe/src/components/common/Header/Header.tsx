import { Avatar, Box, Button, Chip } from "@mui/material";
import React from "react";
import { Add } from "@mui/icons-material"
import { Home } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const Header: React.FC = () => {
  return (
    <header
    
    style={{ background: '#eee', padding: '1rem', paddingLeft: "260px" }}
    
    >
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Box>
          Test Lop Thu A
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>
          <Button variant="outlined" startIcon={<Add />} >Tạo lớp</Button>
          <Button startIcon={<Home />} >Trang chủ</Button>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>
            <Avatar/>
            <Box sx={{display:"flex",flexDirection:"column", alignItems:"start", justifyContent:"center"}}>
              <Chip size="small" variant="outlined" sx={{border:"none", fontWeight:"bolder"}} color="primary" label ={"Dang Quang Trung"} />
              <Chip size="small" variant="outlined" sx={{fontSize:"13px"}} label ={"Giao vien"} />
            </Box>
            <ArrowDropDownIcon/>
          </Box>
        </Box>
      </Box>
    </header>
  )
};

export default Header