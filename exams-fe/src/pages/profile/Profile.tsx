import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { jwtDecode } from "jwt-decode";
import { useAuth, useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import type { ChangePasswordForm, ChangeUserForm } from "../../utils/validation";
import { changePasswordSchema, changeUserSchema } from "../../utils/validation";
import { Base64 } from 'js-base64';
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    const { getAccessToken } = useAuth()
    const { changePassword, changeUser } = useAuthStore()
    const info = jwtDecode(getAccessToken())
    const navigate = useNavigate()

    const [changePasswordForm, setChangePasswordForm] = useState<ChangePasswordForm>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [changeUserForm, setChangeUserForm] = useState({
        name: "",
        email: "",
        school: "",
        parent_name: "",
        parent_phone: "",
        avata: {
            id: 0,
            url: "",
            payload: ""
        }
    }
    )

    const [changePasswordErrors, setChangePasswordErrors] = useState<Partial<Record<keyof ChangePasswordForm, string>>>({});
    const [changeUserErrors, setChangeUserErrors] = useState<Partial<Record<keyof ChangeUserForm, string>>>({});

    // State để lưu trữ lỗi validation
    const [validationErrors, setValidationErrors] = useState<{
        [K in keyof ChangePasswordForm]?: string
    }>({})


    // Load thông tin user khi component mount
    useEffect(() => {
        if (info) {
            setChangeUserForm(prev => ({
                ...prev,
                name: info.name || "",
                email: info.email || "",
                school: info.school || "",
                parent_name: info.parent_name || "",
                parent_phone: info.parent_phone || ""
            }));
        }
        console.log(info)
    }, []);

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangePasswordForm({
            ...changePasswordForm,
            [name]: value
        })

        // Xóa lỗi của field đang được nhập
        if (validationErrors[name as keyof ChangePasswordForm]) {
            setValidationErrors({
                ...validationErrors,
                [name]: undefined
            })
        }
    }

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangeUserForm({
            ...changeUserForm,
            [name]: value
        });

        // Xóa lỗi của field đang được nhập
        if (changeUserErrors[name as keyof ChangeUserForm]) {
            setChangeUserErrors({
                ...changeUserErrors,
                [name]: undefined
            });
        }
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setChangeUserForm(prev => ({
                    ...prev,
                    avata: {
                        ...prev.avata,
                        url: base64String,
                        // payload: base64String.split(',')[1] // Lấy phần base64 data
                        payload: base64String// Lấy phần base64 data
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    //====== change password

    const onSaveChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {

        console.log(changePasswordForm);

        const result = changePasswordSchema.safeParse(changePasswordForm);
        if (!result.success) {
            const fieldErrors: typeof changePasswordErrors = {};
            const flattened = result.error.flatten().fieldErrors;

            for (const key in flattened) {
                const [message] = flattened[key as keyof ChangePasswordForm] || [];
                if (message) {
                    fieldErrors[key as keyof ChangePasswordForm] = message;
                }
            }

            setChangePasswordErrors(fieldErrors);
        } else {
            setChangePasswordErrors({});

            try {
                const changePasswordField = {
                    id: info.id,
                    old_password: Base64.encode(changePasswordForm.oldPassword),
                    new_password: Base64.encode(changePasswordForm.newPassword),
                };
                console.log(changePasswordField)

                await changePassword(changePasswordField);
                console.log("Password changed successfully");
                // setChangePasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
                navigate("/classes");

            } catch (error) {
                console.error("Failed to change password:", error);
            }
        }
    };

    //====== change user

    const onSaveChangeUser = async () => {
        console.log("Saving user info:", changeUserForm);

        // Validate form data
        const result = changeUserSchema.safeParse({
            name: changeUserForm.name,
            email: changeUserForm.email,
            school: changeUserForm.school,
            parent_name: changeUserForm.parent_name,
            parent_phone: changeUserForm.parent_phone
        });

        if (!result.success) {
            const fieldErrors: typeof changeUserErrors = {};
            const flattened = result.error.flatten().fieldErrors;

            for (const key in flattened) {
                const [message] = flattened[key as keyof ChangeUserForm] || [];
                if (message) {
                    fieldErrors[key as keyof ChangeUserForm] = message;
                }
            }

            setChangeUserErrors(fieldErrors);
            return;
        } else {
            setChangeUserErrors({});
        }

        try {
            const updateUserData = {
                id: info.id,
                name: changeUserForm.name,
                email: changeUserForm.email,
                school: changeUserForm.school,
                parent_name: changeUserForm.parent_name,
                parent_phone: changeUserForm.parent_phone,
                ...(changeUserForm.avata.payload && {
                    avatar: {
                        id: changeUserForm.avata.id,
                        payload: changeUserForm.avata.payload, 
                        url: changeUserForm.avata.url
                    }
                })
            };

            console.log("Update user data:", updateUserData);
            // await updateUserProfile(updateUserData);
            await changeUser(info.id, updateUserData)
            console.log("User profile updated successfully");

            // Có thể hiển thị thông báo thành công ở đây
            // toast.success("Cập nhật thông tin thành công!");

        } catch (error) {
            console.error("Failed to update user profile:", error);
            // Có thể hiển thị thông báo lỗi ở đây
            // toast.error("Cập nhật thông tin thất bại!");
        }
    }

    return (
        <>
            <Box>Thông tin cá nhân</Box>

            <Grid container sx={{ gap: "30px", mb: "30px" }}>
                <Grid size={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <Box sx={{ fontWeight: "bold" }}>Thông tin cơ bản</Box>
                    <Box>
                        <Button variant="contained" onClick={onSaveChangeUser}>Lưu lại</Button>
                    </Box>
                </Grid>
                <Grid size={12} >
                    <Box sx={{ display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                        <Avatar 
                            sx={{ width: 150, height: 150 }} 
                            src={changeUserForm.avata.url || undefined}
                        />
                        <Button 
                            startIcon={<CameraAltIcon />} 
                            variant="outlined" 
                            sx={{ textTransform: "none" }}
                            component="label"
                        >
                            Tải lên
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleAvatarUpload}
                            />
                        </Button>
                    </Box>
                </Grid>
                <Grid container size={12} spacing={"30px"} >
                    <Grid container size={6} sx={{ flexDirection: "column" }}>
                        <Grid size={12} >
                            <Box sx={{ mb: "10px" }}>Tên của bạn</Box>
                            <TextField
                                name="name"
                                value={changeUserForm.name}
                                onChange={onChangeUser}
                                error={!!changeUserErrors.name}
                                helperText={changeUserErrors.name}
                                InputProps={{
                                    sx: { height: 40 },
                                }} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Trường</Box>
                            <TextField
                                name="school"
                                value={changeUserForm.school}
                                onChange={onChangeUser}
                                label={"Nhập tên trường bạn"}
                                error={!!changeUserErrors.school}
                                helperText={changeUserErrors.school}
                                InputProps={{
                                    sx: { height: 40 },
                                }} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Số điện thoại/email phụ huynh</Box>
                            <TextField
                                name="parent_phone"
                                value={changeUserForm.parent_phone}
                                onChange={onChangeUser}
                                error={!!changeUserErrors.parent_phone}
                                helperText={changeUserErrors.parent_phone}
                                InputProps={{
                                    sx: { height: 40 },
                                }} fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container size={6} sx={{ flexDirection: "column" }}>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Email</Box>
                            <TextField disabled value={info.email} InputProps={{
                                sx: { height: 40 },
                            }} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Tên phụ huynh</Box>
                            <TextField
                                name="parent_name"
                                value={changeUserForm.parent_name}
                                onChange={onChangeUser}
                                error={!!changeUserErrors.parent_name}
                                helperText={changeUserErrors.parent_name}
                                InputProps={{
                                    sx: { height: 40 },
                                }} fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container sx={{ gap: "30px" }}>
                <Grid size={12} >
                    <Box>Thay đổi mật khẩu</Box>
                </Grid>
                <Grid size={12}>
                    <Box sx={{ mb: "10px" }}>Mật khẩu cũ</Box>
                    <TextField
                        onChange={onChangePassword}
                        name="oldPassword"
                        value={changePasswordForm.oldPassword}
                        type="password"
                        error={!!changePasswordErrors.oldPassword}
                        helperText={changePasswordErrors.oldPassword}
                        InputProps={{
                            sx: { height: 40, width: 300 },
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <Box sx={{ mb: "10px" }}>Mật khẩu mới</Box>
                    <TextField
                        onChange={onChangePassword}
                        name="newPassword"
                        value={changePasswordForm.newPassword}
                        type="password"
                        error={!!changePasswordErrors.newPassword}
                        helperText={changePasswordErrors.newPassword}
                        InputProps={{
                            sx: { height: 40, width: 300 },
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <Box sx={{ mb: "10px" }}>Nhập lại mật khẩu mới</Box>
                    <TextField
                        onChange={onChangePassword}
                        name="confirmPassword"
                        value={changePasswordForm.confirmPassword}
                        type="password"
                        error={!!changePasswordErrors.confirmPassword}
                        helperText={changePasswordErrors.confirmPassword}
                        InputProps={{
                            sx: { height: 40, width: 300 },
                        }}
                    />
                </Grid>
                <Grid size={12} >
                    <Box>
                        <Button variant="contained" onClick={onSaveChangePassword}>Lưu lại</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile;