import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
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
                <Grid size={8} sx={{ fontWeight: "bold", fontSize: "2.4rem" }} >DANH SÁCH BÀI THI</Grid>
                <Grid size={4} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                    <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }} placeholder="Tìm kiếm" />
                    <Button sx={{ fontSize: "1.4rem", width:"180px" }} onClick={() => setOpen(true)} startIcon={<Add />} >Tạo bài thi</Button>
                    <ExamGroupForm open={open} setOpen={setOpen} action={"create"} />
                </Grid>

                <Grid size={12} container>
                    <Grid size={12} container sx={{fontWeight:"800", fontSize:"1.8rem"}} >Danh sách lớp đang thi</Grid>
                    {
                        startedOrOngoingExams.map(e => {
                            return (
                                <Grid size={4} key={e.id}>
                                    <Box
                                        onClick={() => { navigate(`${e.id}`) }}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease-in-out',
                                            borderRadius: 2,
                                            p: 0.5,
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            }
                                        }}
                                    >
                                        <ExamCard examE={e} />
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid size={12} container>
                    <Grid size={12} container sx={{fontWeight:"800", fontSize:"1.8rem"}} >Danh sách lớp chưa bắt đầu</Grid>
                    {
                        notStartedYetExams.map(e => {
                            return (
                                <Grid size={4} key={e.id}>
                                    <Box
                                        onClick={() => { navigate(`${e.id}`) }}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease-in-out',
                                            borderRadius: 2,
                                            p: 0.5,
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            }
                                        }}
                                    >
                                        <ExamCard examE={e} />
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default ExamList;