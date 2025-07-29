import { Box, Button, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import QuestionCard from "../../../components/cards/QuestionCard/QuestionCard";
import AssignmentCard from "../../../components/cards/AssignmentCard/AssignmentCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useExamState } from "../../../stores/examStore";
import { useClassState } from "../../../stores/classStore";

const ExamDetail: React.FC = () => {
    const { id, exam_id } = useParams();
    const { examSelecting, getExam, getExamDetailList, examDetailList } = useExamState();
    const { classSelecting } = useClassState();

    useEffect(() => {
        getExam(Number(exam_id));
        getExamDetailList(Number(exam_id));
    }, [])

    return (
        <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "space-between", gap: "80px" }}>
            <Grid size={12}>
                Danh sách bài thi {">"} Chi tiết bài thi
            </Grid>
            
            <Grid size={12} container sx={{ alignItems: "start", justifyContent: "space-between", border: "2px solid #45b0e1", padding: "30px", borderRadius: "10px" }}>
                <Grid size={9}>
                    <Box>
                        Tên bài thi: {examSelecting.name}
                    </Box>
                    <Box>
                        Ngày bắt đầu: {examSelecting.start_time}
                    </Box>
                    <Box>
                        Thời gian chờ giữa các bài thi: {examSelecting.await_time / 60} phút
                    </Box>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                    <Button sx={{ width: "120px" }} variant="contained" color="success">
                        Chỉnh sửa
                    </Button>
                    <Button sx={{ width: "120px" }} variant="outlined" color="error">
                        Xóa bỏ
                    </Button>
                </Grid>
            </Grid>
            
            <Grid container size={12}>
                <Grid container size={12}>
                    <Grid size={10} sx={{ fontWeight: "bold", fontSize: "1.8rem", color: "#2b6cb0" }}>
                        Danh sách đề bài
                    </Grid>
                    <Grid size={2} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button startIcon={<AddIcon />} sx={{ color: "#fff" }} variant="contained">
                            Thêm đề bài
                        </Button>
                    </Grid>
                </Grid>
                <Grid container size={12} sx={{ display: "flex", alignItems: "stretch" }}>
                    {examDetailList.map((exam, index) => (
                        <Grid size={3} key={index}>
                            <QuestionCard exam={exam} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            
            <Grid container size={12}>
                <Grid container size={12} sx={{ fontWeight: "bold", fontSize: "1.8rem", color: "#2b6cb0" }}>
                    Danh sách bài làm
                </Grid>
                <Grid container size={12} sx={{ alignItems: "stretch" }}>
                    {examSelecting.users?.map((user, index) => (
                        <Grid size={3} key={index}>
                            <AssignmentCard user={user} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ExamDetail;