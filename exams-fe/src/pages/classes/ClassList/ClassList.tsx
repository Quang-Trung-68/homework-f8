import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import ClassCard from "../../../components/cards/ClassCard/ClassCard";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useClassState } from "../../../stores/classStore";
import { useEffect } from "react";

const ClassList: React.FC = () => {

    const { classes, getClasses } = useClassState();
    useEffect(() => {
        getClasses();
    }, []);
    console.log(classes);
    

    return (
        <>

            <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "start" }} >
                <Grid size={8} sx={{ fontWeight: "bold", fontSize: "24px" }} >DANH SÁCH LỚP HỌC</Grid>
                <Grid size={4} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                    <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }} placeholder="Tìm kiếm" />
                    <Button startIcon={<Add />} >Thêm lớp học</Button>
                </Grid>
                {
                    classes.map(e => {
                        return (<Grid size={4}  ><ClassCard classElement = {e} /></Grid>)
                    })
                }
            </Grid>
            <Outlet />
        </>
    )
}

export default ClassList;
