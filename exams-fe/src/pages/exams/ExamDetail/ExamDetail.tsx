import { Box, Button, Grid, Typography, Breadcrumbs, Link, Card, CardContent } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionCard from "../../../components/cards/QuestionCard/QuestionCard";
import AssignmentCard from "../../../components/cards/AssignmentCard/AssignmentCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useExamState } from "../../../stores/examStore";
import { useClassState } from "../../../stores/classStore";
import ExamGroupForm from "../../../components/forms/ExamGroupForm/ExamGroupForm";

const ExamDetail: React.FC = () => {
    const { id, exam_id } = useParams();
    const { examSelecting, getExam, getExamDetailList, examDetailList } = useExamState();
    const { classSelecting } = useClassState();
    const [openForm, setOpenForm] = useState(false);
    const [action, setAction] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getExam(Number(exam_id));
        getExamDetailList(Number(exam_id));
    }, []);

    const formatDateTime = (dateTime: string) => {
        if (!dateTime) return "Chưa thiết lập";
        return new Date(dateTime).toLocaleString('vi-VN');
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Breadcrumb */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link 
                    underline="hover" 
                    color="inherit" 
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                    fontSize={"1.6rem"}
                    fontWeight={"bold"}
                >
                    Danh sách bài thi
                </Link>
                <Typography fontWeight={"bold"} color="primary" fontSize={"1.6rem"} >Chi tiết bài thi</Typography>
            </Breadcrumbs>

            {/* Exam Info Card */}
            <Card sx={{ mb: 4, border: "2px solid #45b0e1" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontWeight: "bold", 
                                    color: "#444", 
                                    mb: 2,
                                    fontSize: { xs: "1.6rem", md: "1.9rem" }
                                }}
                            >
                                {examSelecting.name || "Tên bài thi"}
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    fontWeight: "600", 
                                    color: "#666", 
                                    mb: 1,
                                    fontSize: { xs: "1.5rem", md: "1.6rem" }
                                }}
                            >
                                <strong>Ngày bắt đầu:</strong> {formatDateTime(examSelecting.start_time)}
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    fontWeight: "600", 
                                    color: "#666",
                                    fontSize: { xs: "1.5rem", md: "1.6rem" }
                                }}
                            >
                                <strong>Thời gian chờ:</strong> {examSelecting.await_time ? `${examSelecting.await_time / 60} phút` : "Chưa thiết lập"}
                            </Typography>
                        </Grid>
                        
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Box sx={{ 
                                display: "flex", 
                                gap: 2, 
                                flexDirection: { xs: "column", sm: "row", lg: "row" },
                                justifyContent: { xs: "center", lg: "flex-end" },
                                alignItems:"end"
                            }}>
                                <Button 
                                    variant="contained" 
                                    color="success"
                                    startIcon={<EditIcon />}
                                    onClick={() => {setAction("edit"); setOpenForm(true)}}
                                    sx={{ minWidth: "120px", maxWidth:"140px" }}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {setAction("delete"); setOpenForm(true)}}
                                    sx={{ minWidth: "120px", maxWidth:"140px" }}
                                >
                                    Xóa bỏ
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Question List Section */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    mb: 3,
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2
                }}>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: "bold", 
                            color: "#2b6cb0",
                            fontSize: { xs: "1.4rem", md: "1.8rem" }
                        }}
                    >
                        Danh sách đề bài ({examDetailList.length})
                    </Typography>
                    <Button 
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate(`create`)}
                        sx={{ minWidth: "140px" }}
                    >
                        Thêm đề bài
                    </Button>
                </Box>

                {examDetailList.length > 0 ? (
                    <Grid container spacing={2}>
                        {examDetailList.map((exam, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                                <QuestionCard exam={exam} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box 
                        sx={{ 
                            textAlign: "center", 
                            py: 4, 
                            color: "text.secondary",
                            bgcolor: "grey.50",
                            borderRadius: 2
                        }}
                    >
                        <Typography>Chưa có đề bài nào</Typography>
                    </Box>
                )}
            </Box>

            {/* Assignment List Section */}
            <Box>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: "bold", 
                        color: "#2b6cb0", 
                        mb: 3,
                        fontSize: { xs: "1.4rem", md: "1.8rem" }
                    }}
                >
                    Danh sách bài làm ({examSelecting.users?.length || 0})
                </Typography>

                {examSelecting.users && examSelecting.users.length > 0 ? (
                    <Grid container spacing={2}>
                        {examSelecting.users.map((user, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                                <AssignmentCard user={user} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box 
                        sx={{ 
                            textAlign: "center", 
                            py: 4, 
                            color: "text.secondary",
                            bgcolor: "grey.50",
                            borderRadius: 2
                        }}
                    >
                        <Typography>Chưa có bài làm nào</Typography>
                    </Box>
                )}
            </Box>

            {/* Form Dialog */}
            <ExamGroupForm 
                open={openForm} 
                setOpen={setOpenForm} 
                action={action} 
                exam={examSelecting} 
            />
        </Box>
    );
};

export default ExamDetail;