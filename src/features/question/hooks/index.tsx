// hooks
import { useState } from "react"
import { useAsync } from "react-use"
// api
import { getQuestions } from "../../../../pages/api/questions"
import { QuestionType } from "../../../models/question_model"

/* 責務: questionsのAPI通信をしデータをstateに格納しておく */
export const useFetchQuestions = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([])

  useAsync(async () => {
    try {
      const response = await getQuestions()
      setQuestions(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    questions: questions,
  }
}