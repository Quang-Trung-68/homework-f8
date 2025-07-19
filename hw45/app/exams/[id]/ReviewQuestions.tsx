import { Box } from "@mui/material";
import { Context } from "./page";
import { useContext } from "react";

export default function ({onCloseMenu}) {

  const injector = useContext(Context);
  const { questionIndex, question, setQuestionIndex, detail } = injector;
  console.log(detail)
  return (
    <Box>
      {
        Array.from({ length: 20 }).map((_, index) => (
          <Box
            onClick = {()=>{ setQuestionIndex(index)
              onCloseMenu(null)
            }}
            key={index}
            sx={{
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
            }}
            
          >
            {index + 1}
          </Box>
        ))
      }
    </Box>
  )
}