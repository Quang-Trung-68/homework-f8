import { Avatar, Box, Button } from "@mui/material"

const AssignmentCard: React.FC = () => {

    return (
        <>
            <Box sx={{display:"flex", gap:"30px", alignItems:"start",padding:"25px 20px", border:"2px solid #45b0e1",borderRadius:"10px" ,flexDirection:"column"}}>
               <Box sx={{display:"flex", gap:"20px"}}>
                <Box>
                    <Avatar/>
                </Box>
                <Box>
                    <Box>Phạm Thùy Dương</Box>
                    <Box>duongduoshawn@gmail.com</Box>
                </Box>
               </Box>
               <Box>
                <Box>Thời gian làm bài:</Box>
                <Box>Số đề đã hoàn thành:</Box>
                <Box>Trạng thái: chờ chấm lại</Box>
               </Box>
               <Box sx={{display:"flex", alignSelf:"center"}}>
                <Button variant="contained" color="success">Chi tiết</Button>
               </Box>
            </Box>
        </>
    )
}

export default AssignmentCard