import axios from "axios"

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

// Firebaseの認証が非同期で行われているため、コンポーネントの初期レンダリング時に認証が完了する前にgetXXXX関数が呼び出され、getAuth().currentUserがnullを返してしまう。
// ApiClient.interceptors.request.use(async (config: any) => {
//   const token = await getAuth().currentUser?.getIdToken()
//   console.log(token)
//   config.headers.authorization = `Bearer ${token}`
//   return config
// })