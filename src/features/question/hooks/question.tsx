import { useState } from "react"
import { useAsync } from "react-use"
import { questionRepository } from "../../../repositories/question_repository"
import { QuestionType } from "../../../models/question_model"

/* 責務: questionのAPI通信をしデータをstateに格納しておく */
export const useFetchQuestion = (id: number) => {
  const [question, setQuestion] = useState<QuestionType>()

  useAsync(async () => {
    try {
      const response = await questionRepository.getQuestion({ id })
      setQuestion(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    question: question,
  }
}