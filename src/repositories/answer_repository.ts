// import { ApiClient } from "../lib/api-client"
import { AnswerType } from "../models/answer_model"
import { getAuth } from "firebase/auth"
import axios from 'axios'

export type AnswerRepository = {
  getAnswer: (params: Pick<AnswerType, "id">) => Promise<AnswerType>
}

const getAnswer = async (params: Pick<AnswerType, "id">): Promise<AnswerType> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/answers/${params.id}`, {
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

export const answerRepository: AnswerRepository = {
  getAnswer
}