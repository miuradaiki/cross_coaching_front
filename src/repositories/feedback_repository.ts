// import { ApiClient } from "../lib/api-client"
import { FeedbackType } from "../models/feedback_model"
import { getAuth } from "firebase/auth"
import axios from 'axios'


export type FeedbackRepository = {
  getFeedbacks: (params: Pick<FeedbackType, "id">) => Promise<FeedbackType[]>
  getMyFeedbacks: () => Promise<FeedbackType[]>
  getFeedback: (params: Pick<FeedbackType, "id">) => Promise<FeedbackType>
}

// api-clientが使えないのでコメントアウト
// const getFeedback : FeedbackRepository["getFeedback"] = async (): Promise<FeedbackType[]> => {
//   const response = await ApiClient.get(`api/v1/feedback`)
//   return response.data
// }
const getMyFeedbacks = async (): Promise<FeedbackType[]> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/my_feedbacks`, {
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

const getFeedbacks = async (params: Pick<FeedbackType, "id">): Promise<FeedbackType[]> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/feedbacks`, {
            headers: { authorization: `Bearer ${token}` },
            params
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

const getFeedback = async (params: Pick<FeedbackType, "id">): Promise<FeedbackType> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/feedbacks/${params.id}`, {
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

export const feedbackRepository: FeedbackRepository = {
  getMyFeedbacks,
  getFeedbacks,
  getFeedback
}
