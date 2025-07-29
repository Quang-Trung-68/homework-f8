import { Box, Button } from "@mui/material"
import EditingPen from '@mui/icons-material/BorderColor';

interface QuestionCardProps {
    exam: {
        name: string;
        code: string;
        total_time: number;
        number_of_question: number;
    }
}

const QuestionCard: React.FC<QuestionCardProps> = ({ exam }) => {
    return (
        <Box sx={{
            display: "flex", 
            gap: "20px", 
            minHeight: "100%", 
            alignItems: "start", 
            padding: "20px 20px", 
            border: "2px dotted #45b0e1", 
            borderRadius: "10px", 
            flexDirection: "column"
        }}>
            <Box sx={{ display: "flex", alignSelf: "stretch", alignItems: "start", justifyContent: "space-between" }}>
                <Box>ĐỀ BÀI: {exam.name}</Box>
                <Box>
                    <Button startIcon={<EditingPen />} sx={{ fontSize: "14px" }}>
                        Edit
                    </Button>
                </Box>
            </Box>
            <Box>
                <Box>Mã đề: {exam.code}</Box>
                <Box>Thời gian làm bài: {exam.total_time / 60} phút</Box>
                <Box>Số câu hỏi: {exam.number_of_question}</Box>
            </Box>
        </Box>
    )
}

export default QuestionCard