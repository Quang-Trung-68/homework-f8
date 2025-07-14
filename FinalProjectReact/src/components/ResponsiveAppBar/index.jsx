import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";

// Styled components for better design
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
  backdropFilter: 'blur(10px)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  }
}));

const UserInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginRight: '15px',
  color: 'white',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  fontSize: '1.5rem',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

export default function ResponsiveAppBar({pages, settings}) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Đăng xuất") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <SchoolIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#FE6B8B",
            }}
          />
          <LogoText
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "white",
            }}
          >
            BKStar
          </LogoText>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: "12px",
                  mt: 1,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(102, 126, 234, 0.1)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {page.icon}
                    <Typography>{page.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <SchoolIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#FE6B8B",
            }}
          />
          <LogoText
            variant="h5"
            noWrap
            component="div"
            onClick={() => navigate("/classes")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "white",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            BKStar
          </LogoText>

          {/* Desktop Navigation */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            {pages.map((page) => (
              <StyledButton
                key={page.name}
                onClick={handleCloseNavMenu}
                startIcon={page.icon}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {page.name}
              </StyledButton>
            ))}
          </Box>

          {/* User Section */}
          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}
          >
            <StyledButton
              startIcon={<HomeIcon />}
              variant="contained"
              sx={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.25)",
                },
              }}
            >
              TRANG CHỦ
            </StyledButton>

            <UserInfoBox>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              >
                Nguyễn Văn A
              </Typography>
              <Chip
                label="Giáo viên"
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "0.75rem",
                  height: "20px",
                }}
              />
            </UserInfoBox>

            <Tooltip title="Cài đặt tài khoản">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  border: "3px solid rgba(255,255,255,0.3)",
                  "&:hover": {
                    border: "3px solid rgba(255,255,255,0.5)",
                  },
                }}
              >
                <Avatar
                  alt="User Avatar"
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  minWidth: "200px",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu("")}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleCloseUserMenu(setting.name)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(102, 126, 234, 0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      width: "100%",
                    }}
                  >
                    {setting.icon}
                    <Typography>{setting.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
