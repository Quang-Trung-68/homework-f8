import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import QuestionCard from "../../../components/cards/QuestionCard/QuestionCard";
import AssignmentCard from "../../../components/cards/AssignmentCard/AssignmentCard";

const examClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ExamDetail: React.FC = () => {

    return (
        <>

            <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "space-between" }} >
                <Grid size={12} >Danh sách bài thi {">"} Chi tiết bài thi</Grid>
                <Grid size={12}  container sx={{alignItems:"start", justifyContent:"space-between", border:"2px solid #45b0e1", padding:"30px", borderRadius:"10px"}}>
                    <Grid size={9} >
                        <Box>
                            Tên bài thi: ĐỀ THI LẦN 1
                        </Box>
                        <Box>
                            Ngày bắt đầu: 09-07-2025
                        </Box>
                        <Box>
                            Thời gian chờ giữa các bài thi: 5 phút
                        </Box>
                    </Grid>
                    <Grid size={3} sx={{display:"flex",justifyContent:"space-between" ,gap:"20px"}} >
                        <Button sx={{width:"120px"}} variant="contained" color="success">Chỉnh sửa</Button>
                        <Button sx={{width:"120px"}} variant="outlined" color="error">Xóa bỏ</Button>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid container size={12} >
                        <Grid size={10} >Danh sách đề bài</Grid>
                        <Grid size={2} sx={{display:"flex", justifyContent:"end"}} >
                            <Button startIcon={<AddIcon/>} sx={{color:"#fff"}} variant="contained">Thêm đề bài</Button>
                        </Grid>
                        
                        </Grid>
                    {
                        examClasses.map(e => {
                            return (<Grid size={3}  ><QuestionCard /></Grid>)
                        })
                    }
                </Grid>
                <Grid container >
                    <Grid size={12} >Danh sách bài làm</Grid>
                    {
                        examClasses.map(e => {
                            return (<Grid size={3}  ><AssignmentCard /></Grid>)
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default ExamDetail;