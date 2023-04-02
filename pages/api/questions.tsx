import { QuestionType } from "../../src/models/question_model"
import { ApiClient } from "@/src/lib/api-client"


export const getQuestions = async (): Promise<QuestionType[]> => {
  const result = await ApiClient.get(`api/v1/questions`)
  return result.data
}