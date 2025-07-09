import { Button, TextField } from "@mui/material";
import homeImage from "../../assets/imgs/home.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postFormLogin } from "../../fetchApis";

export const LoginForm = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const goToClasses = ()=>{
    navigate("/classes")
  }

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const onChange = (name, value) => {
    console.log(formLogin);
    setFormLogin({ ...formLogin, [name]: value });
  };

  const postForm = async () => {
    try {
      const data = await postFormLogin(formLogin);
      if(data?.access && data?.refresh){
        console.log(data);
        localStorage.setItem("accessToken", data.access)
        localStorage.setItem("refreshToken", data.refresh)
        goToClasses()
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div
        className="body"
        style={{
          margin: "100px 200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="body-image"
          style={{
            width: "50vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#3182ce",
            padding: 20,
            borderRadius: "10px 0 0 10px",
          }}
        >
          <img
            src={homeImage}
            style={{
              width: "60%",
              borderRadius: "20px",
              height: "100%",
            }}
          />
        </div>
        <div
          style={{
            width: "50vw",
            padding: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          className="body-content"
        >
          <h1 style={{ color: "blue" }}>BK Classroom</h1>
          <p style={{ fontSize: 26, fontWeight: "bold" }}>Đăng Nhập</p>
          <p>Cung cấp giải pháp toàn diện cho lớp học thông minh</p>

          <TextField
            id="outlined-email"
            label="Nhập email"
            name="email"
            variant="outlined"
            sx={{ width: "70%", mt: 3 }}
            value={formLogin.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          <TextField
            id="outlined-password"
            label="Nhập password"
            name="password"
            variant="outlined"
            sx={{ width: "70%", mt: 2 }}
            value={formLogin.password}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />

          <Button
            onClick={postForm}
            sx={{
              fontWeight: "bold",
              m: 1,
              width: "70%",
              mt: 4,
              height: "50px",
            }}
            variant="contained"
          >
            Đăng nhập
          </Button>

          <div>
            <Button onClick={goToRegister} sx={{ m: 1 }} variant="text">
              Đăng ký
            </Button>
            <span>tài khoản cho học viên</span>
          </div>
        </div>
      </div>
    </>
  );
};
