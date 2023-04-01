import axios from "axios"
import { QuestionType } from "../models/question_model"

export const getQuestions = async (): Promise<QuestionType[]> => {
  const result = await axios.get(`api/v1/questions`)
  return result.data
}