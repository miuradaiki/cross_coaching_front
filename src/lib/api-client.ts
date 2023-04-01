import axios from "axios"
import "firebase/compat/auth"
import { getAuth } from "firebase/auth"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const headers = {
  "Content-Type": "application/json",
}

export const ApiClient = axios.create({ baseURL, headers })

ApiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    switch (error?.response?.status) {
      case 401:
        break
      case 404:
        break
      default:
        console.log("== internal server error")
    }

    const errorMessage = (error.response?.data?.message || "").split(",")
    throw new Error(errorMessage)
  }
)

ApiClient.interceptors.request.use(async (config: any) => {
  const auth = getAuth()
  const token = await auth.currentUser.getIdToken(true)
  config.headers.authorization = `Bearer ${token}`
  return config
})