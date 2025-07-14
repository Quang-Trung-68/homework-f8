import React from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";

const CreateClassForm: React.FC = () => {

    return (
        <>
            <Box>
                <TextField required type="email" fullWidth label={"Nhập tên lớp học"} sx={{mb:"20px"}} />
                <TextField required type="password" fullWidth label={"Nhập mã bảo vệ"} />
            </Box>
        </>
    )
}

export default CreateClassForm