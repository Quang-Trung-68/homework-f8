import style from "./style.module.sass";
import {Box} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MultipleChoice from "./MultipleChoice";
import { useContext, useState } from "react";
import { Context } from "./page";

export default function () {

    const injector = useContext(Context);
    const { questionIndex,question,detail } = injector;
    const [key,setKey] = useState(0)

    const onReview = ()=>{
      question.isReview = !question.isReview;
      setKey(key+1)
    }
  return (
    <>
      <Box className={style.toolBar}>
        <Box className={style.numberOfQuestion}>{questionIndex + 1} / {detail.length}</Box>
        <Box>
          <Box>
            <CalculateIcon style={{color: '#1976D2'}}/>
            <span>Calculator</span>
          </Box>
          <Box>
            <BookmarkBorderIcon style={{color: !question.isReview ? '#1976D2' : "red"}}/>
            <span onClick={onReview}>Mark for review</span>
          </Box>
          <Box>ABC</Box>
        </Box>
      </Box>

      <Box>
        <p>
         {question.question}
        </p>
        <MultipleChoice/>
      </Box>
    </>
  )
}