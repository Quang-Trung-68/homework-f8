import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { RegisterForm } from "../../components/RegisterForm";


export default function Register() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="register-form"
        style={{
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img className="logo" style={{ height: 30 }} src={logo} />
        <h1>Đăng ký học viên</h1>
        <RegisterForm goToHome = {goToHome} />
      </div>
    </>
  );
}
