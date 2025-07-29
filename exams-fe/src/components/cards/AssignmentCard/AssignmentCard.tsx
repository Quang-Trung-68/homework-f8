import { Avatar, Box, Button } from "@mui/material"

const AssignmentCard: React.FC = ({user}) => {

    return (
        <>
            <Box sx={{display:"flex", gap:"30px", alignItems:"start",padding:"25px 20px", border:"2px solid #45b0e1",borderRadius:"10px" ,flexDirection:"column"}}>
               <Box sx={{display:"flex", gap:"20px"}}>
                <Box>
                    <Avatar/>
                </Box>
                <Box>
                    <Box sx={{fontSize:"1.5rem", fontWeight:"bold"}}>{user.name}</Box>
                    <Box sx={{color:"#666", fontSize:"1.3rem"}}>{user.email}</Box>
                </Box>
               </Box>
               <Box>
                <Box sx={{color:"#666", fontSize:"1.5rem"}}>Thời gian làm bài:</Box>
                <Box sx={{color:"#666", fontSize:"1.5rem"}}>Số đề đã hoàn thành:</Box>
                <Box sx={{color:"#666", fontSize:"1.5rem"}}>Trạng thái: chờ chấm lại</Box>
               </Box>
               <Box sx={{display:"flex", alignSelf:"center"}}>
                <Button variant="contained" color="success">Chi tiết</Button>
               </Box>
            </Box>
        </>
    )
}

export default AssignmentCard