import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { postFormRegister } from "../../fetchApis";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

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

export const RegisterForm = ({ goToHome }) => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    status: "confirmed",
  });

  const [open, setOpen] = useState(false);

  const onChange = (name, value) => {
    setFormRegister({ ...formRegister, [name]: value });
    console.log(formRegister);
  };

  const postForm = async () => {
    try {
      const data = await postFormRegister({ ...formRegister });
      console.log(data);
      setOpen(true);
      console.log(open);
    } catch (error) {
      console.log(error);
    }
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
