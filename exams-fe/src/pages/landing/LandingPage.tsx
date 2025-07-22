import { Box, Button } from "@mui/material";
import React from "react";
import logo from "../../../public/images/logo.png"
import imgLanding from "../../../public/images/image-landing.avif"
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
                    <Button>Giới thiệu</Button>
                    <Button>Tính năng</Button>
                    <Button>Đối tác</Button>
                    <Button>Liên hệ</Button>
                    </Box> 
                </Box>
    
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", mt:"30px", gap:"30px"}}>
                    <Box sx={{display:"flex", alignItems:"start", flexDirection:"column", gap:"20px"}}>
                        <Box sx={{fontWeight:"bold", fontSize:"24px", color:"blue"}}>BKStar Classroom</Box>
                        <Box sx={{fontWeight:"bold", fontSize:"32px"}}>Cung cấp giải pháp học tập một cách hiệu quả</Box>
                        <Box>Đa dạng bài tập và đề thi, quản lí theo lớp học.</Box>
                        <Box>Làm bài thi trực tuyến, hệ thống chấm bài tự động vào thông minh.</Box>
                        <Box>
                            <Button onClick={()=> navigate("/login")} sx={{mr:"20px"}} variant="outlined">Đăng nhập</Button>
                            <Button onClick={()=> navigate("/register")} variant="contained">Đăng ký</Button>
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