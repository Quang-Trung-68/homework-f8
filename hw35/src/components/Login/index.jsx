import { useEffect, useState } from "react";
import { post } from "../../utils/index.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const styles = {
  body: {
    background: "#c0c0c0",
    fontFamily: "'Raleway', sans-serif",
    color: "#666",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  form: {
    padding: "40px 50px",
    maxWidth: "300px",
    width: "100%",
    borderRadius: "5px",
    background: "#fff",
    boxShadow: "1px 1px 1px #666",
    textAlign: "center",
  },
  input: {
    width: "100%",
    display: "block",
    boxSizing: "border-box",
    margin: "10px 0",
    padding: "14px 12px",
    fontSize: "16px",
    borderRadius: "2px",
    fontFamily: "'Raleway', sans-serif",
    border: "1px solid #c0c0c0",
    transition: "0.2s",
  },
  button: {
    width: "100%",
    height: "48px",
    border: "none",
    background: "#EF5350",
    color: "white",
    fontWeight: "bold",
    transition: "0.2s",
    margin: "20px 0",
    cursor: "pointer",
  },
  title: {
    margin: "20px 0 0",
    color: "#EF5350",
    fontSize: "28px",
  },
  paragraph: {
    marginBottom: "40px",
  },
  links: {
    display: "table",
    width: "100%",
    boxSizing: "border-box",
    borderTop: "1px solid #c0c0c0",
    marginBottom: "10px",
    paddingTop: "10px",
    fontSize: "0.8em",
  },
  linkLeft: {
    display: "table-cell",
    textAlign: "left",
    textDecoration: "none",
    color: "#666",
  },
  linkRight: {
    display: "table-cell",
    textAlign: "right",
    textDecoration: "none",
    color: "#666",
  },
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //Auto Set account to input field to test
  useEffect(() => {
    setUsername("admin@gmail.com");
    setPassword("12345678");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post(
        "login",
        {
          email: username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.access && response?.refresh) {
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        navigate("/post");
      }
    } catch (error) {
      console.log(
        "There is an error when you are login process. Please check your email and password."
      );
      toast.error(
        "There is an error when you are login process. Please check your email and password."
      );
      console.log(error);
    }
  };
  return (
    <div style={styles.body}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Welcome, User!</h2>
        <p style={styles.paragraph}>Please log in</p>
        <input
          type="email"
          required
          placeholder="User Name"
          style={styles.input}
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          style={styles.input}
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Log In
        </button>
        <div style={styles.links}>
          <a href="#" style={styles.linkLeft}>
            Forgot password?
          </a>
          <a href="#" style={styles.linkRight}>
            Sign up
          </a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
