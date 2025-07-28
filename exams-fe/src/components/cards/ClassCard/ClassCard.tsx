import { Box, Button } from "@mui/material"
import GoClass from '@mui/icons-material/Login';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";
import type { ClassI } from "../../../types/classes.types";
import { useClassState } from "../../../stores/classStore";

interface ClassCardProps {
    classElement: ClassI
}

const ClassCard: React.FC<ClassCardProps> = ({classElement}) => {

    const navigate = useNavigate()
    const { classSelecting, getClass } = useClassState()
    

    return (
        <>
            <Box color={"white"} sx={{background:"#31b5ee", borderRadius:"10px",padding:"20px"}}>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <Box>{classElement.name}</Box>
                <Button onClick={()=> navigate(`/classes/${classElement.id}`)} sx={{fontWeight:"bold"}} color="inherit" startIcon={<GoClass/>}>Vào lớp</Button>
            </Box>
            <Box sx={{fontSize:"32px",fontWeight:"bold"}}>{classElement.users.length}</Box>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <Box>Thành viên tham gia</Box>

            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
                <Box>Mã lớp: {classElement.id}</Box>
                <Button size="small" variant="outlined" sx={{fontWeight:"bold", fontSize:"10px"}} color="inherit" startIcon ={<ShareIcon/>} >Chia sẻ</Button>
            </Box>

            </Box>
            </Box>
        </>
    )
}

export default ClassCard