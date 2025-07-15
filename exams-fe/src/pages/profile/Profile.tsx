import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const Profile: React.FC = () => {

    return (
        <>

            <Box>Thông tin cá nhân</Box>

            <Grid container sx={{gap:"30px", mb:"30px"}}>
                <Grid size={12} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}} >
                    <Box sx={{fontWeight:"bold"}}>Thông tin cơ bản</Box>
                    <Box>
                        <Button variant="contained">Lưu lại</Button>
                    </Box>
                </Grid>
                <Grid size={12} >
                    <Box sx={{display:"flex",gap:"20px", justifyContent:"space-between", alignItems:"center", flexDirection:"column"}}>
                        <Avatar sx={{ width: 150, height: 150 }} />
                        <Button startIcon={<CameraAltIcon/>} variant="outlined" sx={{textTransform:"none"}} >Tải lên</Button>
                    </Box>
                </Grid>
                <Grid container size={12} spacing={"30px"} >
                    <Grid container size={6} sx={{ flexDirection: "column" }}>
                        <Grid size={12} >
                            <Box sx={{ mb: "10px" }}>Tên của bạn</Box>
                            <TextField InputProps={{
                                sx: { height: 40 },
                            }} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Trường</Box>
                            <TextField label={"Nhập tên trường bạn"} InputProps={{
                                sx: { height: 40 },
                            }} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Số điện thoại/email phụ huynh</Box>
                            <TextField InputProps={{
                                sx: { height: 40 },
                            }} fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container size={6} sx={{ flexDirection: "column" }}>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Email</Box>
                            <TextField InputProps={{
                                sx: { height: 40 },
                            }} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ mb: "10px" }}>Tên phụ huynh</Box>
                            <TextField InputProps={{
                                sx: { height: 40 },
                            }} fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container sx={{gap:"30px"}}>
                <Grid size ={12} >
                    <Box>Thay đổi mật khẩu</Box>
                </Grid>
                <Grid size={12}>
                    <Box sx={{ mb: "10px" }}>Mật khẩu cũ</Box>
                    <TextField InputProps={{
                        sx: { height: 40, width: 300 },
                    }}  />
                </Grid>
                <Grid size={12}>
                    <Box sx={{ mb: "10px" }}>Mật khẩu mới</Box>
                    <TextField InputProps={{
                        sx: { height: 40, width: 300 },
                    }}  />
                </Grid>
                <Grid size={12}>
                    <Box sx={{ mb: "10px" }}>Nhập lại mật khẩu mới</Box>
                    <TextField InputProps={{
                        sx: { height: 40, width: 300 },
                    }}  />
                </Grid>
                <Grid size={12} >
                    <Box>
                        <Button variant="contained">Lưu lại</Button>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default Profile;