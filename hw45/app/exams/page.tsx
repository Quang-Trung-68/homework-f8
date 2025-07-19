'use client'

import api from "@/plugins/api";
import {useEffect, useState} from "react";
import { useParams, useRouter } from 'next/navigation'

export default function () {
  const [exams, setExams] = useState([])
  const router = useRouter()


  const getExams = async () => {
    try {
      const {data} = await api.get(`/exams`)
      setExams(data)
    } catch (e) {
      console.log(e)
    }
  }

  const onClick = () => {
    // router.push('/exams/1')
    router.replace('/exams/1')
  }

  useEffect(() => {
    getExams()
  }, [])

  return (
    <>
      <ul>
        {
          exams.map((exam) => {
            return (
              <li key={exam.id}>
                <button onClick={onClick}>{exam.title}</button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}