import { Box, Button, Grid } from "@mui/material";
import CreateClassForm from "../../../components/forms/CreateClassForm/CreateClassForm";


const CreateClass: React.FC = () => {

    return (
        <>
            <Box sx={{fontSize:"32px", fontWeight:"bold", mb:"50px"}} >Thêm lớp học mới</Box>
            <Grid container>
                <Grid size={4}>

                </Grid>
                <Grid size={4}>
                    <CreateClassForm />
                    <Box mt={"40px"} sx={{display:"flex", justifyContent:"space-evenly"}}>
                        <Button variant="outlined" color="error" >HỦY</Button>
                        <Button variant="contained">TẠO MỚI</Button>
                    </Box>

                </Grid>
                <Grid size={4}>

                </Grid>
            </Grid>


        </>
    )
}

export default CreateClass;