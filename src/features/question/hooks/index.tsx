import { useState } from "react"
import { useAsync } from "react-use"
import { questionRepository } from "../../../repositories/question_repository"
import { QuestionType } from "../../../models/question_model"

/* 責務: questionsのAPI通信をしデータをstateに格納しておく */
export const useFetchQuestions = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([])

  useAsync(async () => {
    try {
      const response = await questionRepository.getQuestions()
      setQuestions(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    questions: questions,
  }
}