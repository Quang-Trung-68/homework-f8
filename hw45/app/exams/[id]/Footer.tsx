'use client'

import style from "./style.module.sass";
import { Box, Button, Menu } from "@mui/material";
import { useContext, useState } from "react";
import CropSquareIcon from '@mui/icons-material/CropSquare';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ReviewQuestions from "./ReviewQuestions";
import { Context, ProviderI } from "./page";

export default function () {

  const injector: ProviderI = useContext(Context);
  const { questionIndex, question, setQuestionIndex,detail } = injector;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const onBack = () => {
    if(questionIndex === 0) return;
    setQuestionIndex(questionIndex - 1)
  }

  const onNext = () => {
    if(questionIndex  === detail.length -1 ) return;
    setQuestionIndex(questionIndex + 1)
  }


  return (
    <Box className={style.footer}>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: -1, // margin top negative (about 8px unit) to push up
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ padding: 2, display:"flex", flexDirection:"column", alignItems:"stretch", gap:"30px" }} className={style.memu}>
          <h2>Section {detail[questionIndex].section} - Module {detail[questionIndex].module}</h2>
          <Box>
            <Box>
              <CropSquareIcon />
              <span>Unanswered</span>
            </Box>
            <Box>
              <CropSquareIcon color={'warning'} />
              <span>Answered</span>
            </Box>
            <Box>
              <BookmarkBorderIcon color={'error'} />
              <span>Review</span>
            </Box>
          </Box>

         <Box> <ReviewQuestions onCloseMenu = {setAnchorEl} /></Box>

          <Box>
            <Button variant={'outlined'}>Go to review page</Button>
          </Box>
        </Box>
      </Menu>

      <Button
        variant="outlined"
        className={style.viewQuestionsBtn}
        onClick={onOpenMenu}
      >
        Questions
      </Button>

      <Box className={style.navigation}>
        <Button
          variant="outlined"
          onClick={onBack}
          disabled = {questionIndex === 0}
        >
          Back
        </Button>

        <Button
          variant="outlined"
          onClick={onNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
