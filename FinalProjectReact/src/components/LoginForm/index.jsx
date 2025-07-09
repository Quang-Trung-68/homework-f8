import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  School,
} from "@mui/icons-material";
import homeImage from "../../assets/imgs/home.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postFormLogin } from "../../fetchApis";
import { z } from "zod";

// Define Zod schema
const schema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải gồm tối thiểu 6 ký tự"),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const goToRegister = () => {
    navigate("/register");
  };

  const goToClasses = () => {
    navigate("/classes");
  };

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const onChange = (name, value) => {
    console.log(formLogin);
    setFormLogin({ ...formLogin, [name]: value });
  };

  // const postForm = async () => {
  //   try {
  //     const data = await postFormLogin(formLogin);
  //     if (data?.access && data?.refresh) {
  //       console.log(data);
  //       localStorage.setItem("accessToken", data.access);
  //       localStorage.setItem("refreshToken", data.refresh);
  //       goToClasses();
  //     }
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const postForm = async () => {
    const result = schema.safeParse(formLogin);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    try {
      const data = await postFormLogin(formLogin);
      if (data?.access && data?.refresh) {
        console.log(data);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        goToClasses();
      }
      return data;
    } catch (error) {
      console.log(error);
    }
    setErrors({});
    alert("Form submitted!");
    console.log("Form data:", formLogin);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            width: "50%",
            backgroundColor: "#1976d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <img
            src={homeImage}
            alt="Home"
            style={{
              width: "80%",
              maxWidth: "300px",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            width: "50%",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <School sx={{ color: "#1976d2", fontSize: "2rem", mr: 1 }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1976d2",
              }}
            >
              BK Classroom
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#2c3e50",
              mb: 1,
            }}
          >
            Đăng Nhập
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#7f8c8d",
              mb: 3,
            }}
          >
            Cung cấp giải pháp toàn diện cho lớp học thông minh
          </Typography>

          {/* Form */}
          <TextField
            label="Nhập email"
            name="email"
            variant="outlined"
            type="email"
            fullWidth
            value={formLogin.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            error={!!errors.email}
            helperText={errors.email?.[0]}
            sx={{ mb: 2 }}
            onFocus={() => setErrors({})}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Nhập password"
            name="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={formLogin.password}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            sx={{ mb: 3 }}
            error={!!errors.password}
            helperText={errors.password?.[0]}
            onFocus={() => setErrors({})}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            onClick={postForm}
            variant="contained"
            size="large"
            fullWidth
            sx={{
              height: "48px",
              fontSize: "16px",
              fontWeight: 600,
              mb: 2,
              borderRadius: "8px",
            }}
          >
            Đăng nhập
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Button
              onClick={goToRegister}
              variant="text"
              sx={{
                color: "#1976d2",
                fontWeight: 500,
                mr: 1,
              }}
            >
              Đăng ký
            </Button>
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "#7f8c8d" }}
            >
              tài khoản cho học viên
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
