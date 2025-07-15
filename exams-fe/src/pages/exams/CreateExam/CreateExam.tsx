import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import QuestionCard from "../../../components/cards/QuestionCard/QuestionCard";
import AssignmentCard from "../../../components/cards/AssignmentCard/AssignmentCard";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnsweringCard from "../../../components/cards/AnsweringCard/AnsweringCard";

const examClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const CreateExam: React.FC = () => {

    return (
        <>

            <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "space-between" }} >
                <Grid size={12} >Danh sách bài thi {">"} Đề thi lần 1 {">"} Thêm bài thi</Grid>
                <Grid size={6}>
                    <Box color={"#000"} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Button startIcon={<FileUploadIcon />} color="inherit" sx={{ textTransform: "none" }}>
                            Tải lên từ máy
                        </Button>
                    </Box>
                </Grid>
                <Grid size={6} container>
                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }} >
                        <Box>Tên đề *</Box>
                        <Box><TextField fullWidth size="small" required label="Nhập tên đề" /></Box>
                    </Grid>
                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }} >
                        <Box>Mã đề *</Box>
                        <Box><TextField fullWidth size="small" required label="Nhập mã đề" /></Box>
                    </Grid>
                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }} >
                        <Box>Thời gian làm bài(phút) *</Box>
                        <Box><TextField fullWidth size="small" required label="Nhập thời gian" /></Box>
                    </Grid>
                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }} >
                        <Box>Số câu *</Box>
                        <Box><TextField type="number"
                            inputProps={{
                                min: 0,
                                max: 100,
                                step: 10,
                            }} fullWidth size="small" required label="Nhập số câu" /></Box>
                    </Grid>
                    <Grid container size={12} >
                           {/* Create answer Q & A */}
                           <AnsweringCard/>
                    </Grid>
                    <Grid size={12} >
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <Button variant="contained">Tạo đề bài</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CreateExam;