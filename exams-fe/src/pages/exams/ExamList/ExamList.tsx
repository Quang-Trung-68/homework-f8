import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import ExamCard from "../../../components/cards/ExamCard/ExamCard";
import { useExamState } from "../../../stores/examStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const examClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ExamList: React.FC = () => {

    const {id} = useParams()
    console.log(id);
    

    const { examGroupSelecting, getExamGroup,clearExamGroup } = useExamState();
    useEffect(() => {
        clearExamGroup()
        getExamGroup(Number(id))
    }, [])

    console.log(examGroupSelecting);

    const now = new Date();

    const startedOrOngoingExams = examGroupSelecting.filter((e) => {
        return e.start_time && new Date(e.start_time) <= now;
    });

    const notStartedYetExams = examGroupSelecting.filter((e) => {
        return !e.start_time || new Date(e.start_time) > now;
    });

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

                <Grid size={12} container >
                    <Grid size={12} container >Danh sách lớp đang thi</Grid>
                    {
                        startedOrOngoingExams.map(e => {
                            return (<Grid size={4} key={e.id}  ><ExamCard examE={e} /></Grid>)
                        })
                    }
                </Grid>
                <Grid size={12} container >
                    <Grid size={12} container >Danh sách lớp chưa bắt đầu</Grid>
                    {
                        notStartedYetExams.map(e => {
                            return (<Grid size={4} key={e.id} ><ExamCard examE={e} /></Grid>)
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default ExamList;