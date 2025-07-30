import { Box, Button, Grid } from "@mui/material";
import CreateClassForm from "../../../components/forms/CreateClassForm/CreateClassForm";
import { useClassState } from "../../../stores/classStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormCreateClassI } from "../../../types/classes.types";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../stores/authStore";


const CreateClass: React.FC = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormCreateClassI>({
        code: "",
        name: ""
    });

    const { createClass } = useClassState()
    
    const { getAccessToken } = useAuth()
    const info = jwtDecode(getAccessToken())

    const onCreate = () => {


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
            <Box sx={{ fontSize: "3.2rem", fontWeight: "bold", mb: "50px" }} >Thêm lớp học mới</Box>
            <Grid container>
                <Grid size={4}>

                </Grid>
                <Grid size={4}>
                    <CreateClassForm formData={formData} setFormData={setFormData} />
                    <Box mt={"40px"} sx={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Button sx={{ fontSize: "1.4rem", width: "100px" }} variant="outlined" color="error" onClick={() => navigate("/classes")} >HỦY</Button>
                        <Button sx={{ fontSize: "1.4rem", width: "100px" }} variant="contained" onClick={onCreate} >TẠO MỚI</Button>
                    </Box>

                </Grid>
                <Grid size={4}>

                </Grid>
            </Grid>


        </>
    )
}

export default CreateClass;