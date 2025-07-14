import React from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";

const RegisterForm: React.FC = () => {

    return (
        <>
            <Box sx={{display:"flex", flexDirection:"column", gap:"20px"}}>
                <TextField required  fullWidth label={"Tên của bạn"} />
                <TextField required type="email" fullWidth label={"Địa chỉ email"} />
                <TextField required type="password" fullWidth label={"Mật khẩu"} />
                <TextField required type="password" fullWidth label={"Nhập lại mật khẩu"} />
            </Box>
        </>
    )
}

export default RegisterForm