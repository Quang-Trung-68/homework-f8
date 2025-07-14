import type React from "react";
import LoginForm from "../../../components/forms/LoginForm/LoginForm";
import { Box, Button, Checkbox, FormControlLabel, Grid, Link } from "@mui/material";
import image from "../../../../public/images/image-login.jpg"

const Login: React.FC = () => {
    return (
        <>
            <Grid container sx={{ alignItems: "stretch", justifyContent: "center" }}>
                <Grid size={3} >
                </Grid>
                <Grid container direction={"column"} spacing={"50px"} sx={{ alignItems: "center", justifyContent: "center",background:"#3182ce", borderEndStartRadius:"10px", borderTopLeftRadius:"10px" }} size={3} >
                    <img width={"90%"} src={image} />
                    <Box>
                        <Box sx={{ fontWeight: "bold", fontSize: "20px",alignSelf: "start" }}>GIEO MẦM SÁNG TẠO...</Box>
                        <Box sx={{fontWeight:"bold", fontSize:"20px",alignSelf: "end"}}>...DẪN HƯỚNG ĐAM MÊ</Box>
                    </Box>
                </Grid>
                <Grid container spacing={"15px"} direction={"column"} sx={{ alignItems: "center", justifyContent: "center" }} size={3} padding={"20px"} >
                    <img width={100} height={100} src={image} />
                    <Box sx={{ fontWeight: "bold", fontSize: "26px" }}>Đăng Nhập</Box>
                    <Box sx={{ textAlign: "center" }}>Cung cấp giải pháp toàn diện cho lớp học thông minh</Box>
                    <LoginForm />
                    <Link sx={{ alignSelf: "end", cursor: "pointer" }}>Quên mật khẩu ?</Link>
                    <FormControlLabel sx={{ alignSelf: "start" }} control={<Checkbox defaultChecked />} label="Ghi nhớ tôi" />
                    <Button fullWidth variant="contained">Đăng nhập</Button>
                    <Button fullWidth variant="text">Đăng ký tài khoản học viên</Button>
                </Grid>
                <Grid size={3} >
                </Grid>
            </Grid>
        </>
    )
}

export default Login