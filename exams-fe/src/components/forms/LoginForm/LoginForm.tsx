import React from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";

const LoginForm: React.FC = () => {

    return (
        <>
            <Box>
                <TextField required type="email" fullWidth label={"Nhập email"} sx={{mb:"20px"}} />
                <TextField required type="password" fullWidth label={"Nhập mật khẩu"} />
            </Box>
        </>
    )
}

export default LoginForm