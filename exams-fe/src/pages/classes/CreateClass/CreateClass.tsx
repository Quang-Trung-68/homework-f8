import { Box, Button, Grid } from "@mui/material";
import CreateClassForm from "../../../components/forms/CreateClassForm/CreateClassForm";
import { useClassState } from "../../../stores/classStore";
import { useState } from "react";
import { decodeToken } from "../../../stores/classStore";
import { useNavigate } from "react-router-dom";
import type { FormCreateClassI } from "../../../types/classes.types";


const CreateClass: React.FC = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormCreateClassI>({
        code: "",
        name: ""
    });

    const { createClass } = useClassState()

    const onCreate = () => {
        const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
        const accessToken = authData?.state?.access;
        const info = decodeToken(accessToken);
        const dataSend = {
            ...formData, users: [
                info.id
            ]
        }
        createClass(dataSend)
        navigate("/classes")
    }

    return (
        <>
            <Box sx={{ fontSize: "32px", fontWeight: "bold", mb: "50px" }} >Thêm lớp học mới</Box>
            <Grid container>
                <Grid size={4}>

                </Grid>
                <Grid size={4}>
                    <CreateClassForm formData={formData} setFormData={setFormData} />
                    <Box mt={"40px"} sx={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Button variant="outlined" color="error" onClick={()=> navigate("/classes")} >HỦY</Button>
                        <Button variant="contained" onClick={onCreate} >TẠO MỚI</Button>
                    </Box>

                </Grid>
                <Grid size={4}>

                </Grid>
            </Grid>


        </>
    )
}

export default CreateClass;