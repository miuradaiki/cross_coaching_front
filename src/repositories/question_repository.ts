import { ApiClient } from "../lib/api-client"
import { QuestionType } from "../models/question_model"

export type QuestionRepository = {
  getQuestions: () => Promise<QuestionType[]>
}

const getQuestions : QuestionRepository["getQuestions"] = async (): Promise<QuestionType[]> => {
  const response = await ApiClient.get(`/questions`)
  return response.data
}

export const questionRepository: QuestionRepository = {
  getQuestions,
}