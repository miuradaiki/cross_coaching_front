// import { ApiClient } from "../lib/api-client"
import { ShareType } from "../models/share_model"
import { getAuth } from "firebase/auth"
import axios from 'axios'


export type ShareRepository = {
  getShares: () => Promise<ShareType[]>
}

// api-clientが使えないのでコメントアウト
// const getShares : ShareRepository["getShares"] = async (): Promise<ShareType[]> => {
//   const response = await ApiClient.get(`api/v1/shares`)
//   return response.data
// }

const getShares = async (): Promise<ShareType[]> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/shares`, {
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

export const shareRepository: ShareRepository = {
  getShares
}