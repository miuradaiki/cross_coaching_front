import axios from 'axios'
import { QuestionType } from "../../src/models/question_model"
import { getAuth } from "firebase/auth"

export const getQuestions = async (): Promise<QuestionType[]> => {
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
