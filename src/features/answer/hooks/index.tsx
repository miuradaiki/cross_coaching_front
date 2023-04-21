import { useState } from "react"
import { useAsync } from "react-use"
import { answerRepository } from "../../../repositories/answer_repository"
import { AnswerType } from "../../../models/answer_model"

/* 責務: answerのAPI通信をしデータをstateに格納しておく */
export const useFetchAnswers = () => {
  const [answers, setAnswers] = useState<AnswerType[]>([])

  useAsync(async () => {
    try {
      const response = await answerRepository.getAnswers()
      setAnswers(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    answers: answers,
  }
}