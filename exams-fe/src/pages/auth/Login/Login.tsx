import type React from "react";
import LoginForm from "../../../components/forms/LoginForm/LoginForm";
import { Box, Button, Checkbox, FormControlLabel, Grid, Link } from "@mui/material";
import image from "@/assets/images/image-login.jpg"
import logo from "@/assets/images/logo.png"

import type { LoginCredentials } from "../../../types/auth.types";
import { useState } from "react";
import { useAuthStore } from "../../../stores/authStore";

import type { LoginData } from "../../../utils/validation";

import { loginSchema } from "../../../utils/validation";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const navigate = useNavigate()

    const { login } = useAuthStore()

    const [formData, setFormData] = useState<LoginCredentials>({
        email: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof LoginData, string>>>({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {


        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: typeof formErrors = {};
            for (const key in result.error.flatten().fieldErrors) {
                const [message] = result.error.flatten().fieldErrors[key as keyof LoginData] || [];
                if (message) fieldErrors[key as keyof LoginData] = message;
            }
            setFormErrors(fieldErrors);
        } else {
            setFormErrors({});
            console.log("✅ Dữ liệu hợp lệ:", result.data);
            // Gửi dữ liệu lên server tại đây nếu cần
            try {
                const response = await login(formData);
                const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
                const accessToken = authData?.state?.access;
                const refreshToken = authData?.state?.refresh;
                console.log(accessToken);
                navigate("/classes")

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Grid container sx={{ alignItems: "stretch", justifyContent: "center" }}>
                <Grid size={3} >
                </Grid>
                <Grid container direction={"column"} spacing={"50px"} sx={{ alignItems: "center", justifyContent: "space-between", padding: "50px 20px", background: "#3182ce", borderEndStartRadius: "10px", borderTopLeftRadius: "10px", display: { xs: 'none', md: 'flex' }, boxShadow: "0 0 6px #000" }} size={3} >
                    <Box ><img width={"100%"} style={{ objectFit: "cover" }} src={image} /></Box>
                    <Box>
                        <Box sx={{ fontWeight: "bold", fontSize: "2rem", alignSelf: "start", color: "#fff" }}>GIEO MẦM SÁNG TẠO...</Box>
                        <Box sx={{ fontWeight: "bold", fontSize: "2rem", alignSelf: "end", color: "#fff" }}>...DẪN HƯỚNG ĐAM MÊ</Box>
                    </Box>
                </Grid>
                <Grid container spacing={"15px"} direction={"column"} sx={{ alignItems: "center", justifyContent: "center", borderRadius: "10px", borderTopLeftRadius: { md: 0 }, borderBottomLeftRadius: { md: 0 }, boxShadow: "0 0 6px #000", background: "#fff" }} size={{ md: 3 }} padding={"20px"} >
                    <img width={100} height={100} src={logo} />
                    <Box sx={{ fontWeight: "bold", fontSize: "26px" }}>Đăng Nhập</Box>
                    <Box sx={{ textAlign: "center" }}>Cung cấp giải pháp toàn diện cho lớp học thông minh</Box>
                    <LoginForm formData={formData} onChange={onChange} formErrors={formErrors} />
                    <Box sx={{display:"flex",alignSelf:"stretch", alignItems:"center", justifyContent:"space-between",fontSize:"1.5rem"}}>
                        <Link sx={{ cursor: "pointer",fontSize:"1.3rem" }}>Quên mật khẩu ?</Link>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{fontSize:"1.4rem"}}/>} label="Ghi nhớ tôi" />
                    </Box>
                    <Button sx={{fontSize:"1.4rem"}} onClick={onSubmit} fullWidth variant="contained">Đăng nhập</Button>
                    <Button sx={{fontSize:"1.4rem"}} onClick={() => navigate("/register")} fullWidth variant="text">Đăng ký tài khoản học viên</Button>
                </Grid>
                <Grid size={3} >
                </Grid>
            </Grid>
        </>
    )
}

export default Login