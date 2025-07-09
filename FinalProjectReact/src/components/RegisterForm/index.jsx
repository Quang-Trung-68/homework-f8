import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { postFormRegister } from "../../fetchApis";

export const RegisterForm = ({ goToHome }) => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    status: "confirmed",
  });

  const onChange = (name, value) => {
    setFormRegister({ ...formRegister, [name]: value });
    console.log(formRegister);
  };

  const postForm = async () => {
    try {
      const data = await postFormRegister({ ...formRegister });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "50vw" }}>
      <Box>
        <p>Tên của bạn</p>
        <TextField
          name="name"
          id="outlined-name"
          label="Nhập tên"
          variant="outlined"
          fullWidth
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Box>
      <Box>
        <p>Địa chỉ email</p>
        <TextField
          name="email"
          id="outlined-email"
          label="Nhập email"
          variant="outlined"
          fullWidth
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Box>
      <Box>
        <p>Mật khẩu</p>
        <TextField
          name="password"
          id="outlined-password"
          label="Nhập mật khẩu"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Box>
      <Box>
        <p>Nhập lại mật khẩu</p>
        <TextField
          name="confirmPassword"
          id="outlined-confirmPassword"
          label="Nhập lại mật khẩu"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          onClick={goToHome}
          sx={{ fontWeight: "bold", m: 3 }}
          variant="outlined"
        >
          Hủy
        </Button>
        <Button sx={{ fontWeight: "bold", m: 3 }} variant="contained" onClick={postForm} >
          Đăng ký
        </Button>
      </div>
    </div>
  );
};
