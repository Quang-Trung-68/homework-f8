'use client'

import { Box, Grid } from "@mui/material";
import style from './style.module.sass'
import QuestionDescription from './Description'
import QuestionSelection from './Selection'
import HeaderBar from './Header'
import FooterBar from './Footer'
import { useParams } from "next/navigation";
import api from "@/plugins/api";
import { createContext, useEffect, useMemo, useState } from "react";

import { DetailI, ExamI, QuestionI, TypeChoice } from "@/app/utils/type";

const defaultExam: ExamI = {
  id: 0,
  title: '',
  description: '',
  details: [
    {
      id: 0,
      section: 0,
      module: 0,
      question: {
        id: 0,
        code: '',
        description: '',
        question: '',
        type: TypeChoice.MULTIPLE_CHOICE,
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        explanation: ''
      }
    }
  ]
}


export const PARTS = [
  { section: 1, module: 1 },
  { section: 1, module: 2 },
  { section: 2, module: 1 },
  { section: 2, module: 2 },
]

export interface ProviderI {
  questionIndex: number
  question: QuestionI
  setQuestionIndex: (questionIndex: number) => void
  detail: DetailI[]
}


export const Context = createContext<ProviderI>()

export default function () {
  const params = useParams();
  const { id } = params;
  const [exam, setExam] = useState<ExamI>(defaultExam)

  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [partIndex, setPartIndex] = useState<number>(0);


  const detail: DetailI[] = useMemo(() => {
    return exam.details;
  }, [exam, questionIndex])

  const question: QuestionI = useMemo(() => {
    return detail[questionIndex].question
  }, [detail, questionIndex])

  const getExam: () => Promise<void> = async () => {
    try {
      const { data } = await api.get(`/exams/${id}`)
      setExam(data)
    } catch (error) {
      console.log(error)
    }
  }
 const provider: ProviderI = {
    questionIndex,
    question,
    setQuestionIndex,
    detail
  }

  useEffect(() => {
    getExam()
  }, [])

  return (
    <>
      <Context.Provider value={provider}>
        <HeaderBar />
        <Box sx={{ margin: '0 5%' }} className={style.main}>
          <Grid container>
            <Grid size={6} sx={{ paddingTop: '10px' }}>
              <QuestionDescription />
            </Grid>
            <Grid size={6}>
              <QuestionSelection />
            </Grid>
          </Grid>
        </Box>
        <FooterBar />
      </Context.Provider>
    </>
  )
}