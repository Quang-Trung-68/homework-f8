import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import ClassCard from "../../../components/cards/ClassCard/ClassCard";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const examClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ClassList: React.FC = () => {

    return (
        <>

            <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "space-between" }} >
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
                    examClasses.map(e => {
                        return (<Grid size={4}  ><ClassCard /></Grid>)
                    })
                }
            </Grid>
            <Outlet/>
        </>
    )
}

export default ClassList;