import { Avatar, Box, Button, Chip, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Add, Logout, Person, PersonAdd, Settings } from "@mui/icons-material"
import { Home } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import {  useClassState } from "../../../stores/classStore";
import { useExamState } from "../../../stores/examStore";
import logo from "@/assets/images/logo.png"
import { useAuth, useAuthStore } from "../../../stores/authStore";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function AccountMenu({ onProfile, onLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ 
          p: 0.5,
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        <Avatar 
          sx={{ 
            width: 36, 
            height: 36,
            bgcolor: 'primary.main',
            fontSize: '1rem',
            fontWeight: 500
          }}
        >
          T
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            minWidth: 200,
            borderRadius: 2,
            mt: 1,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            border: '1px solid',
            borderColor: 'divider'
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            handleClose();
            onProfile();
          }}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <Person fontSize="large" />
          </ListItemIcon>
          <Typography fontSize="1.4rem" variant="body2">Profile</Typography>
        </MenuItem>
        
        <Divider sx={{ my: 0.5 }} />
        
        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonAdd fontSize="large"/>
          </ListItemIcon>
          <Typography fontSize="1.4rem" variant="body2">Add account</Typography>
        </MenuItem>
        
        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Settings fontSize="large" />
          </ListItemIcon>
          <Typography fontSize="1.4rem" variant="body2">Settings</Typography>
        </MenuItem>
        
        <Divider sx={{ my: 0.5 }} />
        
        <MenuItem 
          onClick={() => {
            handleClose();
            onLogout();
          }}
          sx={{ 
            py: 1.5,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'error.contrastText'
            }
          }}
        >
          <ListItemIcon>
            <Logout fontSize="large" sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <Typography fontSize="1.4rem" variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { classSelecting, getClass, clearClass } = useClassState()
  const { clearExamGroup } = useExamState()

  const { getAccessToken } = useAuth()
  const info = jwtDecode(getAccessToken())
  

  const onProfile = () => {
    navigate("/profile")
  }

  const onLogout = () => {
    navigate("/login");
    Cookies.remove("auth-storage");
  }
  return (
    <header

      style={{ background: '#eee', padding: "10px 30px" }}

    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Box sx={{ fontWeight: "bold", fontSize: "2.4rem" }}>
          {
            classSelecting.name ||
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px" }}>
              <img width={"10%"} src={logo} />
              <Box component={"span"}>BK Classroom</Box>
            </Box>
          }
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <Button sx={{ fontSize: "1.4rem" }} variant="outlined" startIcon={<Add />} onClick={() => navigate("/classes/create")} >Tạo lớp</Button>
          <Button sx={{ fontSize: "1.4rem" }} startIcon={<Home />} onClick={() => { clearClass(); clearExamGroup(); navigate("/classes") }} >Trang chủ</Button>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <AccountMenu onProfile={onProfile} onLogout={onLogout} />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", gap: "4px" }}>
              <Chip size="small" variant="outlined" sx={{ border: "none", fontWeight: "bolder", fontSize: "1.5rem" }} color="primary" label={info.name} />
              <Chip size="small" variant="outlined" sx={{ fontSize: "1.3rem", fontWeight: "bold" }} label={info.role === "teacher" ? "Giáo viên" : "Học sinh"} />
            </Box>
          </Box>
        </Box>
      </Box>
    </header>
  )
};

export default Header