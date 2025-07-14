import type React from "react";
import RegisterForm from "../../../components/forms/RegisterForm/RegisterForm";
import { Box, Button, Grid } from "@mui/material";
import image from "../../../../public/images/image-login.jpg"

const Register: React.FC = () => {
    return (
        <>

            <Grid container>
                <Grid size={4} ></Grid>
                <Grid size={4} sx={{ display: "flex", flexDirection: "column", gap: "30px", boxShadow:"0 0 4px #000", borderRadius:"10px" }}  p={"20px"}>
                    <img width={50} height={50} style={{alignSelf:"center"}} src={image} />
                    <Box sx={{ fontSize: "26px", fontWeight: "bold", textAlign: "center" }} >ĐĂNG KÝ HỌC VIÊN </Box>
                    <RegisterForm />
                    <Box sx={{ display: "flex", gap: "20px" }}>
                        <Button variant="outlined" color="error">HỦY</Button>
                        <Button variant="contained">ĐĂNG KÝ</Button>
                    </Box></Grid>
                <Grid size={4} ></Grid>

            </Grid>
        </>
    );
};

export default Register;
