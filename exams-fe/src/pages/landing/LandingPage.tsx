import { Box, Button } from "@mui/material";
import React from "react";
import logo from "@/assets/images/logo.png"
import imgLanding from "@/assets/images/image-landing.avif"
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                   <Box>
                    <img src={logo} width={50} height={50} ></img>
                    </Box> 
                   <Box>
                    <Button sx={{fontSize:"1.4rem"}}>Giới thiệu</Button>
                    <Button sx={{fontSize:"1.4rem"}}>Tính năng</Button>
                    <Button sx={{fontSize:"1.4rem"}}>Đối tác</Button>
                    <Button sx={{fontSize:"1.4rem"}}>Liên hệ</Button>
                    </Box> 
                </Box>
    
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", mt:"30px", gap:"30px"}}>
                    <Box sx={{display:"flex", alignItems:"start", flexDirection:"column", gap:"20px"}}>
                        <Box sx={{fontWeight:"bold", fontSize:"24px", color:"blue"}}>BKStar Classroom</Box>
                        <Box sx={{fontWeight:"bold", fontSize:"32px"}}>Cung cấp giải pháp học tập một cách hiệu quả</Box>
                        <Box>Đa dạng bài tập và đề thi, quản lí theo lớp học.</Box>
                        <Box>Làm bài thi trực tuyến, hệ thống chấm bài tự động vào thông minh.</Box>
                        <Box>
                            <Button onClick={()=> navigate("/login")} sx={{mr:"20px", fontSize:"1.5rem"}} variant="outlined">Đăng nhập</Button>
                            <Button onClick={()=> navigate("/register")} variant="contained" sx={{fontSize:"1.5rem"}}>Đăng ký</Button>
                        </Box>
                    </Box>
                    <Box>
                        <img src={imgLanding} width={"100%"} height={"50%"} style={{borderRadius:"10px"}}></img>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LandingPage;