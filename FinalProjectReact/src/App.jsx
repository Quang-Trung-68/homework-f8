import "./App.css";
import logo from "./assets/imgs/logo.png";
import homeImage from "./assets/imgs/home.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const goToLogin = ()=>{
    navigate("/login")
  }

  const goToRegister = ()=>{
    navigate("/register")
  }


  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
        className="header"
      >
        <img className="logo" style={{ height: 30 }} src={logo} />
        <div style={{ display: "flex", gap: "5px" }}>
          <Button sx={{ fontWeight: "bold" }} variant="text">
            Giới thiệu
          </Button>
          <Button sx={{ fontWeight: "bold" }} variant="text">
            Tính năng
          </Button>
          <Button sx={{ fontWeight: "bold" }} variant="text">
            Đối tác
          </Button>
          <Button sx={{ fontWeight: "bold" }} variant="text">
            Liên hệ
          </Button>
        </div>
      </div>
      <div
        className="body"
        style={{
          padding: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "50vw" }} className="body-content">
          <h1 style={{ color: "blue" }}>BK Classroom</h1>
          <p style={{ fontSize: 26, fontWeight: "bold" }}>
            Cung cấp giải pháp học tập một cách hiệu quả
          </p>
          <p>Đa dạng bài tập và đề thi, quản lí theo lớp học.</p>
          <p>
            Làm bài thi trực tuyến, hệ thống chấm bài tự động vào thông minh.
          </p>
          <div>
            <Button onClick={goToLogin} sx={{ fontWeight: "bold", m: 1 }} variant="outlined">
              Đăng nhập
            </Button>
            <Button onClick={goToRegister} sx={{ fontWeight: "bold", m: 1 }} variant="contained">
              Đăng ký
            </Button>
          </div>
        </div>
        <div className="body-image" style={{ width: "50vw" }}>
          <img
            src={homeImage}
            style={{
              width: "60%",
              borderRadius: "20px",
              height: "100%",
              float: "right",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
