import { Box, Grid } from "@mui/material";
import { Context } from "./page";
import { useContext } from "react";


export default function ({ onCloseMenu }) {

  const injector = useContext(Context);
  const { questionIndex, question, setQuestionIndex, detail } = injector;
  return (
    <Box>
      <Grid container sx={{ alignItems: "center", justifyContent: "space-between" }}>
        {
          Array.from({ length: detail.length }).map((_, index) => (
            <Grid size={12/detail.length*2}
              key={index}
            >
              <Box
                onClick={() => {
                  setQuestionIndex(index)
                  onCloseMenu(null)
                }} sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: detail[index].question?.answer ? '#1976d2' : "#fff",
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: !detail[index].question?.answer ? '#1976d2' : "#fff",
                  border: `2px solid ${detail[index].question.isReview ? 'red' : "#1976d2"}`,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>{index + 1}</Box>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}