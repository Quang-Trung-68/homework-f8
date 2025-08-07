import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import ExamCard from "../../../components/cards/ExamCard/ExamCard";
import { useExamState } from "../../../stores/examStore";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExamGroupForm from "../../../components/forms/ExamGroupForm/ExamGroupForm";
import React from "react";

const ExamList: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const { examGroupSelecting, getExamGroup, clearExamGroup } = useExamState();
    
    // State cho search
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    // Debounce search term với delay 400ms
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    useEffect(() => {
        clearExamGroup();
        getExamGroup(Number(id));
    }, []);

    const now = new Date();

    // Filter exams based on search term
    const filteredExams = useMemo(() => {
        if (!debouncedSearchTerm.trim()) {
            return examGroupSelecting;
        }
        
        const searchLower = debouncedSearchTerm.toLowerCase().trim();
        return examGroupSelecting.filter((exam) => 
            exam.name?.toLowerCase().includes(searchLower) ||
            exam.description?.toLowerCase().includes(searchLower) ||
            exam.subject?.toLowerCase().includes(searchLower) ||
            exam.code?.toLowerCase().includes(searchLower)
        );
    }, [examGroupSelecting, debouncedSearchTerm]);

    const startedOrOngoingExams = filteredExams.filter((e) => {
        return e.start_time && new Date(e.start_time) <= now;
    });

    const notStartedYetExams = filteredExams.filter((e) => {
        return !e.start_time || new Date(e.start_time) > now;
    });

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
                            size="small"
                            
                            placeholder="Tìm kiếm bài thi..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ 
                                maxWidth: { md: "400px" },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#f8f9fa',
                                    '& fieldset': {
                                        borderColor: '#e0e0e0'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2'
                                    }
                                }
                            }}
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
                                py: 1,
                                textTransform: 'none',
                                borderRadius: 2
                            }}
                        >
                            Tạo bài thi
                        </Button>
                    </Grid>
                </Grid>

                {/* Search Results Info */}
                {debouncedSearchTerm && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" fontSize={"1.4rem"} color="text.secondary">
                            {filteredExams.length > 0 
                                ? `Tìm thấy ${filteredExams.length} bài thi cho "${debouncedSearchTerm}"`
                                : `Không tìm thấy kết quả cho "${debouncedSearchTerm}"`
                            }
                        </Typography>
                    </Box>
                )}
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
                        <Typography fontSize={"1.4rem"}>
                            {debouncedSearchTerm 
                                ? "Không có bài thi đang diễn ra phù hợp với từ khóa tìm kiếm"
                                : "Không có bài thi nào đang diễn ra"
                            }
                        </Typography>
                        {debouncedSearchTerm && (
                            <Typography fontSize={"1.3rem"} variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Thử tìm kiếm với từ khóa khác
                            </Typography>
                        )}
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
                        <Typography fontSize={"1.4rem"}>
                            {debouncedSearchTerm 
                                ? "Không có bài thi sắp diễn ra phù hợp với từ khóa tìm kiếm"
                                : "Không có bài thi nào sắp diễn ra"
                            }
                        </Typography>
                        {debouncedSearchTerm && (
                            <Typography fontSize={"1.3rem"} variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Thử tìm kiếm với từ khóa khác
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>

            {/* Form Dialog */}
            <ExamGroupForm open={open} setOpen={setOpen} action={"create"} />
        </Box>
    );
};

// Custom useDebounce hook (nếu chưa có)
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default ExamList;