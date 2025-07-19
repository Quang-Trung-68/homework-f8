import { useContext } from "react";
import style from "./style.module.sass";
import { Box, Button } from "@mui/material";
import { Context, ProviderI } from "./page";



export default function () {

  const injector: ProviderI = useContext(Context);
    const { questionIndex, question, setQuestionIndex,detail } = injector;
  
  return (
    <Box
      sx={{ height: 64, backgroundColor: '#cbedfd', padding: '0 5%' }}
      className={`flex justify--space-between align-items--center ${style.mainColor}`}
    >
      <Box><b>Section {detail[questionIndex].section} - Module {detail[questionIndex].module} </b></Box>
      <Box><b>30:30</b></Box>
      <Box>
        <Button variant={'outlined'}>Submit</Button>
      </Box>
    </Box>
  )
}