import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { postFormRegister } from "../../fetchApis";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

function Popup({ open, setOpen }) {
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Trạng thái đăng ký:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Đăng ký thành công.
          </Typography>
          <Button sx={{ m: 2 }} variant="contained" onClick={goToLogin}>
            Quay lại trang đăng nhập
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

// Define Zod schema
const schema = z
  .object({
    name: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
    email: z.string().email("Email không đúng định dạng"),
    password: z.string().min(6, "Mật khẩu phải gồm tối thiểu 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"], // attach error to confirmPassword
  });

export const RegisterForm = ({ goToHome }) => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    status: "confirmed",
  });
  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);

  const onChange = (name, value) => {
    setFormRegister({ ...formRegister, [name]: value });
    console.log(formRegister);
  };

  // const postForm = async () => {
  //   try {
  //     const data = await postFormRegister({ ...formRegister });
  //     console.log(data);
  //     setOpen(true);
  //     console.log(open);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const postForm = async () => {
    const result = schema.safeParse(formRegister);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    try {
      const data = await postFormRegister({ ...formRegister });
      console.log(data);
      setOpen(true);
      console.log(open);
    } catch (error) {
      console.log(error);
    }
    setErrors({});
    alert("Form submitted!");
    console.log("Form data:", formRegister);
  };

  return (
    <div style={{ width: "50vw" }}>
      <Popup open={open} setOpen={setOpen} />
      <Box>
        <p>Tên của bạn</p>
        <TextField
          name="name"
          id="outlined-name"
          label="Nhập tên"
          variant="outlined"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.[0]}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onFocus={()=> setErrors({})}
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
          error={!!errors.email}
          helperText={errors.email?.[0]}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onFocus={()=> setErrors({})}
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
          error={!!errors.password}
          helperText={errors.password?.[0]}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onFocus={()=> setErrors({})}
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
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.[0]}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onFocus={()=> setErrors({})}
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
        <Button
          sx={{ fontWeight: "bold", m: 3 }}
          variant="contained"
          onClick={postForm}
        >
          Đăng ký
        </Button>
      </div>
    </div>
  );
};
