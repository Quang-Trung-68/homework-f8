import type React from "react";
import RegisterForm from "../../../components/forms/RegisterForm/RegisterForm";
import { Box, Button, Grid } from "@mui/material";
import image from "../../../../public/images/image-login.jpg"
import { useAuthStore } from "../../../stores/authStore";
import { useState } from "react";
import type { RegisterData } from "../../../types/auth.types";
import { registerSchema } from "../../../utils/validation";
import type { RegisterFields } from "../../../utils/validation";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {

    const navigate = useNavigate()

    // form send to backend
    const [formData, setFormData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
        role: "student",
        status: "confirming",
    })
    // form to check validation
    const [formFields, setFormFields] = useState<RegisterFields>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof RegisterFields, string>>>({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        })
    }

    const { register } = useAuthStore();

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // ////
        const result = registerSchema.safeParse(formFields);

        if (!result.success) {
            const errorMap: typeof formErrors = {};
            const fieldErrors = result.error.flatten().fieldErrors;
            for (const key in fieldErrors) {
                const [msg] = fieldErrors[key as keyof RegisterFields] || [];
                if (msg) errorMap[key as keyof RegisterFields] = msg;
            }
            setFormErrors(errorMap);
        } else {
            setFormErrors({});

            // Chỉ lấy name, email, password để gửi về backend
            const { name, email, password } = result.data;
            const formDataToSubmit = {
                name, email, password, role: "student",
                status: "confirming",
            };

            console.log("✅ Dữ liệu gửi:", formDataToSubmit);
            try {
                const response = await register(formDataToSubmit)
                console.log("register oke");
                console.log(response);

            } catch (error) {
                console.log(error);

            }
        }

    }
    return (
        <>
            <Grid size={12} container sx={{ alignItems: "stretch", flexDirection: "row" }}>
                <Grid size={{ md: 4, sm: 2, xs: 2 }}> {/* Responsive */}
                    {/* Empty grid */}

                </Grid>
                <Grid container
                    size={{ md: 4, sm: 8, xs: 8 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        boxShadow: "0 0 4px #000",
                        borderRadius: "10px",
                        padding: "20px"
                    }}
                >
                    <img width={50} height={50} style={{ alignSelf: "center" }} src={image} />
                    <Box sx={{ fontSize: "26px", fontWeight: "bold", textAlign: "center" }}>
                        ĐĂNG KÝ HỌC VIÊN
                    </Box>
                    <RegisterForm onChange={onChange} formFields={formFields} formErrors={formErrors} />
                    <Box sx={{ display: "flex", gap: "20px" }}>
                        <Button onClick={()=> navigate("/")} variant="outlined" color="error">HỦY</Button>
                        <Button onClick={onSubmit} variant="contained">ĐĂNG KÝ</Button>
                    </Box>
                </Grid>
                <Grid size={{ md: 4, sm: 2, xs: 2 }}>
                    {/* Empty grid */}

                </Grid>
            </Grid>
        </>
    );
};

export default Register;
