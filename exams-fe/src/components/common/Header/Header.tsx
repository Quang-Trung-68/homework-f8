import { Avatar, Box, Button, Chip, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Add, Logout, PersonAdd, Settings } from "@mui/icons-material"
import { Home } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { decodeToken, useClassState } from "../../../stores/classStore";
import { useExamState } from "../../../stores/examStore";
import logo from "../../../../public/images/logo.png"

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>T</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { classSelecting, getClass, clearClass } = useClassState()
  const { clearExamGroup } = useExamState()
  const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
  const accessToken = authData?.state?.access;
  const info = decodeToken(accessToken);
  return (
    <header

      style={{ background: '#eee', padding: "10px 30px" }}

    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Box>
          {
            classSelecting.name ||
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px" }}>
              <img width={"10%"} src={logo} />
              <Box component={"span"}>BK Classroom</Box>
            </Box>
          }
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <Button variant="outlined" startIcon={<Add />} onClick={() => navigate("/classes/create")} >Tạo lớp</Button>
          <Button startIcon={<Home />} onClick={() => { clearClass(); clearExamGroup(); navigate("/classes") }} >Trang chủ</Button>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <AccountMenu />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", gap: "5px" }}>
              <Chip size="small" variant="outlined" sx={{ border: "none", fontWeight: "bolder" }} color="primary" label={info.name} />
              <Chip size="small" variant="outlined" sx={{ fontSize: "13px" }} label={info.role === "teacher" ? "Giáo viên" : "Học sinh"} />
            </Box>
          </Box>
        </Box>
      </Box>
    </header>
  )
};

export default Header