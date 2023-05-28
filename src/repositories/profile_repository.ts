// import { ApiClient } from "../lib/api-client"
import { ProfileType } from "../models/profile_model"
import { getAuth } from "firebase/auth"
import axios from 'axios'

export type profileRepository = {
  getProfile: () => Promise<ProfileType>
}

const getProfile = async (): Promise<ProfileType> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          const result = await axios.get(`api/v1/profile`, {
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

export const profileRepository: profileRepository = {
  getProfile
}
