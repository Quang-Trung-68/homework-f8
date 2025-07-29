import { Box } from "@mui/material"
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from "react-router-dom";
import { useExamState } from "../../../stores/examStore";
import { useClassState } from "../../../stores/classStore";
import { useEffect } from "react";
const ExamCard: React.FC = ({ examE }) => {

    // console.log(examE);

    const navigate = useNavigate();
    // const { examSelecting, getExam, examGroupSelecting } = useExamState();
    // const { classSelecting } = useClassState();


    // useEffect(() => {
    //     getExam(examE.id);
    //     console.log(examSelecting);
    // }, [])


    return (

        <Box sx={{ display: "flex", gap: "20px", alignItems: "center", padding: "15px 20px", borderLeft: "6px solid #45b0e1" }}>
            <Box>
                <DescriptionIcon sx={{ color: "#45b0e1", fontSize: "46px" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <Box sx={{ fontWeight: "bold" }}>{examE.name}</Box>
                <Box sx={{ fontSize: "14px" }}> {examE["start_time"]} </Box>
            </Box>
        </Box>

    )
}

export default ExamCard