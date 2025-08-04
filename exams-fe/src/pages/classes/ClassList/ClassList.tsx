import { Button, Grid, InputAdornment, TextField, Box } from "@mui/material";
import ClassCard from "../../../components/cards/ClassCard/ClassCard";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useClassState } from "../../../stores/classStore";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../stores/authStore";

const ClassList: React.FC = () => {
    const { classes, getClasses, clearClass } = useClassState();
    const { getAccessToken } = useAuth()
    const info = jwtDecode(getAccessToken())

    useEffect(() => {
        clearClass()
        getClasses();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            {/* Header Section */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 4,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Box sx={{
                    fontWeight: "bold",
                    fontSize: "2.4rem",
                    color: "#1a1a1a",
                    flex: 1,
                    minWidth: '300px'
                }}>
                    DANH SÁCH LỚP HỌC
                </Box>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                    justifyContent: 'flex-end',
                    minWidth: '400px'
                }}>
                    <TextField
                        placeholder="Tìm kiếm lớp học..."
                        variant="outlined"
                        size="medium"
                        sx={{
                            minWidth: '250px',
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: '#666' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {info.role === "teacher" && <Button
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            px: 3,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: 'none',
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0'
                            }
                        }}
                    >
                        Thêm lớp học
                    </Button>}
                </Box>
            </Box>

            {/* Classes Grid */}
            <Grid container spacing={3}>
                {classes.length > 0 ? classes.map((classElement) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={classElement.id}>
                        <ClassCard classElement={classElement} />
                    </Grid>
                )) : "Bạn chưa có lớp học nào."}
            </Grid>

            <Outlet />
        </Box>
    )
}

export default ClassList;