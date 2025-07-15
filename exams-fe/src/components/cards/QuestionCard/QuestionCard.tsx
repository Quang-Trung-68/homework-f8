import { Box, Button } from "@mui/material"
import EditingPen from '@mui/icons-material/BorderColor';

const QuestionCard: React.FC = () => {

    return (
        <>
            <Box sx={{display:"flex", gap:"20px", alignItems:"start",padding:"25px 20px", border:"2px dotted #45b0e1",borderRadius:"10px" ,flexDirection:"column"}}>
               <Box sx={{display:"flex",alignSelf:"stretch", alignItems:"center", justifyContent:"space-between"}}>
                <Box>ĐỀ BÀI: PHẦN 1: TQ DUY TOÁN HỌC</Box>
                <Box>
                    <Button startIcon={<EditingPen/>} sx={{fontSize:"14px"}} >Edit</Button>
                </Box>
               </Box>
               <Box>
                <Box>Mã đề: 01</Box>
                <Box>Thời gian làm bài: 60 phút</Box>
                <Box>Số câu hỏi: 40</Box>
               </Box>
            </Box>
        </>
    )
}

export default QuestionCard