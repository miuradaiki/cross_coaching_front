// import { ApiClient } from "../lib/api-client"
import { QuestionType } from "../models/question_model"
import { getAuth } from "firebase/auth"
import axios from 'axios'


export type QuestionRepository = {
  getQuestions: () => Promise<QuestionType[]>
  getQuestion: (params: Pick<QuestionType, "id">) => Promise<QuestionType>
}

// api-clientが使えないのでコメントアウト
// const getQuestions : QuestionRepository["getQuestions"] = async (): Promise<QuestionType[]> => {
//   const response = await ApiClient.get(`api/v1/questions`)
//   return response.data
// }

// const getQuestion : QuestionRepository["getQuestion"] = async (params: Pick<QuestionType, "id">): Promise<QuestionType> => {
//   const response = await ApiClient.get(`api/v1/questions/${params.id}`)
//   return response.data
// }

const getQuestions = async (): Promise<QuestionType[]> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/questions`, {
            headers: { authorization: `Bearer ${token}` },
          })
          resolve(result.data)
        } catch (error) {
          reject(error)
        } finally {
          unsubscribe()
        }
      } else {
        unsubscribe()
        reject(new Error("User is not authenticated"))
      }
    })
  })
}

const getQuestion = async (params: Pick<QuestionType, "id">): Promise<QuestionType> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/questions/${params.id}`, {
            headers: { authorization: `Bearer ${token}` },
          })
          resolve(result.data)
        } catch (error) {
          reject(error)
        } finally {
          unsubscribe()
        }
      } else {
        unsubscribe()
        reject(new Error("User is not authenticated"))
      }
    })
  })
}

export const questionRepository: QuestionRepository = {
  getQuestions,
  getQuestion
}