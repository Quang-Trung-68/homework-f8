import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import ExamCard from "../../../components/cards/ExamCard/ExamCard";
import { useExamState } from "../../../stores/examStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExamGroupForm from "../../../components/forms/ExamGroupForm/ExamGroupForm";
import React from "react";

const ExamList: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const { examGroupSelecting, getExamGroup, clearExamGroup } = useExamState();
    
    useEffect(() => {
        clearExamGroup();
        getExamGroup(Number(id));
    }, []);

    const now = new Date();

    const startedOrOngoingExams = examGroupSelecting.filter((e) => {
        return e.start_time && new Date(e.start_time) <= now;
    });

    const notStartedYetExams = examGroupSelecting.filter((e) => {
        return !e.start_time || new Date(e.start_time) > now;
    });

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: "bold", 
                        mb: 3,
                        fontSize: { xs: "1.8rem", md: "2.4rem" }
                    }}
                >
                    DANH SÁCH BÀI THI
                </Typography>
                
                {/* Search and Create Button */}
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <TextField 
                            fullWidth
                            placeholder="Tìm kiếm bài thi..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ maxWidth: { md: "400px" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                        <Button 
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setOpen(true)}
                            sx={{ 
                                fontSize: "1.5rem",
                                px: 3,
                                py: 1
                            }}
                        >
                            Tạo bài thi
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Started/Ongoing Exams Section */}
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: "bold", 
                        mb: 2,
                        fontSize: { xs: "1.4rem", md: "1.8rem" }
                    }}
                >
                    Đang thi ({startedOrOngoingExams.length})
                </Typography>
                
                {startedOrOngoingExams.length > 0 ? (
                    <Grid container spacing={2}>
                        {startedOrOngoingExams.map((exam) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={exam.id}>
                                <Box
                                    onClick={() => navigate(`${exam.id}`)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease-in-out',
                                        borderRadius: 2,
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                        }
                                    }}
                                >
                                    <ExamCard examE={exam} />
                                </Box>
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
                        <Typography>Không có bài thi nào đang diễn ra</Typography>
                    </Box>
                )}
            </Box>

            {/* Not Started Exams Section */}
            <Box>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: "bold", 
                        mb: 2,
                        fontSize: { xs: "1.4rem", md: "1.8rem" }
                    }}
                >
                    Chưa bắt đầu ({notStartedYetExams.length})
                </Typography>
                
                {notStartedYetExams.length > 0 ? (
                    <Grid container spacing={2}>
                        {notStartedYetExams.map((exam) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={exam.id}>
                                <Box
                                    onClick={() => navigate(`${exam.id}`)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease-in-out',
                                        borderRadius: 2,
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                        }
                                    }}
                                >
                                    <ExamCard examE={exam} />
                                </Box>
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
                        <Typography>Không có bài thi nào sắp diễn ra</Typography>
                    </Box>
                )}
            </Box>

            {/* Form Dialog */}
            <ExamGroupForm open={open} setOpen={setOpen} action={"create"} />
        </Box>
    );
};

export default ExamList;