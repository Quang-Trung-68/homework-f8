import { Box, Button } from "@mui/material"
import GoClass from '@mui/icons-material/Login';
import ShareIcon from '@mui/icons-material/Share';
const ClassCard: React.FC = () => {

    return (
        <>
            <Box color={"white"} sx={{background:"#31b5ee", borderRadius:"10px",padding:"20px"}}>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <Box>Test thi thu</Box>
                <Button sx={{fontWeight:"bold"}} color="inherit" startIcon={<GoClass/>}>Vào lớp</Button>
            </Box>
            <Box sx={{fontSize:"32px",fontWeight:"bold"}}>1</Box>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <Box>Thành viên tham gia</Box>

            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
                <Box>Mã lớp: 123456</Box>
                <Button size="small" variant="outlined" sx={{fontWeight:"bold", fontSize:"10px"}} color="inherit" startIcon ={<ShareIcon/>} >Chia sẻ</Button>
            </Box>

            </Box>
            </Box>
        </>
    )
}

export default ClassCard