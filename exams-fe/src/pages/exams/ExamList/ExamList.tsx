import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import ExamCard from "../../../components/cards/ExamCard/ExamCard";
import { useExamState } from "../../../stores/examStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExamGroupForm from "../../../components/forms/ExamGroupForm/ExamGroupForm";
import React from "react";

const ExamList: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const { id } = useParams()
    console.log(id);


    const { examGroupSelecting, getExamGroup, clearExamGroup } = useExamState();
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
                    <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Add />} >Tạo bài thi</Button>
                    <ExamGroupForm open={open} setOpen={setOpen} />
                </Grid>

                <Grid size={12} container >
                    <Grid size={12} container>Danh sách lớp đang thi</Grid>
                    {
                        startedOrOngoingExams.map(e => {
                            return (<Grid size={4} key={e.id}  ><div onClick={() => { navigate(`${e.id}`) }}><ExamCard examE={e} /></div></Grid>)
                        })
                    }
                </Grid>
                <Grid size={12} container >
                    <Grid size={12} container >Danh sách lớp chưa bắt đầu</Grid>
                    {
                        notStartedYetExams.map(e => {
                            return (<Grid size={4} key={e.id} ><div onClick={() => { navigate(`${e.id}`) }}><ExamCard examE={e} /></div></Grid>)
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default ExamList;