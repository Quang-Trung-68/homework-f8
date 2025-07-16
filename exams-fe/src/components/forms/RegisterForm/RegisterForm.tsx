import React from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import type { RegisterFields } from "../../../utils/validation";

interface RegisterFormProps {
    formFields: RegisterFields,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    formErrors: Partial<Record<keyof RegisterFields, string>>,
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formFields, formErrors, onChange }) => {

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <TextField
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    value={formFields.name} onChange={onChange} name="name" required fullWidth label={"Tên của bạn"} />
                <TextField
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    value={formFields.email} onChange={onChange} name="email" required type="email" fullWidth label={"Địa chỉ email"} />
                <TextField
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    value={formFields.password} onChange={onChange} name="password" required type="password" fullWidth label={"Mật khẩu"} />
                <TextField
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    value={formFields.confirmPassword} onChange={onChange} name="confirmPassword" required type="password" fullWidth label={"Nhập lại mật khẩu"} />
            </Box>
        </>
    )
}

export default RegisterForm