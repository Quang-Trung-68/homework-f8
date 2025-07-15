import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import ExamCard from "../../../components/cards/ExamCard/ExamCard";

const examClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ExamList: React.FC = () => {

    return (
        <>

            <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "space-between" }} >
                <Grid size={8} sx={{ fontWeight: "bold", fontSize: "24px" }} >DANH SÁCH BÀI THI</Grid>
                <Grid size={4} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                    <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }} placeholder="Tìm kiếm" />
                    <Button variant="contained" startIcon={<Add />} >Tạo bài thi</Button>
                </Grid>

                <Grid container >
                    <Grid size={12} >Danh sách lớp đang thi</Grid>
                    {
                        examClasses.map(e => {
                            return (<Grid size={4}  ><ExamCard /></Grid>)
                        })
                    }
                </Grid>
                <Grid container >
                    <Grid size={12} >Danh sách lớp chưa bắt đầu</Grid>
                    {
                        examClasses.map(e => {
                            return (<Grid size={4}  ><ExamCard /></Grid>)
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default ExamList;