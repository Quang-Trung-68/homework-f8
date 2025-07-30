import React from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import type { LoginCredentials } from "../../../types/auth.types";
import type { LoginData } from "../../../utils/validation";

interface LoginFormProps {
    formData: LoginCredentials,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    formErrors: Partial<Record<keyof LoginData, string>>
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, onChange, formErrors }) => {

    return (
        <>
            <Box>
                <TextField
                    autoComplete="off"
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    value={formData.email} onChange={onChange} name="email" required type="email" fullWidth label={"Nhập email"} sx={{ mb: "20px" }} />
                <TextField
                    autoComplete="off"
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    value={formData.password} onChange={onChange} name="password" required type="password" fullWidth label={"Nhập mật khẩu"} />
            </Box>
        </>
    )
}

export default LoginForm