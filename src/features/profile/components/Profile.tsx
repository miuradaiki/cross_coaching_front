import React, { useState } from "react"
import { ProfileType } from "../../../models/profile_model"
import { InputLabel, TextField, Button } from "@mui/material"
import { getAuth, sendPasswordResetEmail, deleteUser, signOut } from "firebase/auth"
import axios from "axios"
import { useAuthContext } from "context/AuthContext"
import { useRouter } from "next/router"

type Props = {
  profile?: ProfileType
}

/* UIの描画のみ責務を持っている */
export const Profile: React.FC<Props> = () => {
  const [email, setEmail] = useState('')
  const { currentUser } = useAuthContext()
  const router = useRouter()

  async function setConfig() {
    const token = await currentUser?.getIdToken()
    const config = {
      headers: { authorization: `Bearer ${token}` },
    }
    return config
  }

  const resetEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      alert('パスワード再設定用のリンクを送信しました。')
    } catch (error) {
      alert('エラーが発生しました。もう一度お試しください。')
    }
  }

  const deleteCurrentUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const auth = getAuth()
    const user = auth.currentUser
    const config = await setConfig()

    if (confirm("本当に削除しますか？") && user) {
      try {
        await axios.delete(
          `/api/v1/users/`,
          config
        )
        await deleteUser(user)
        alert('削除しました')
      } catch (error) {
        alert('エラーが発生しました。もう一度お試しください。')
      }
    }
    router.push("/")
  }

  return (
    <>
      <div>
        <h1>Profile</h1>
        <form onSubmit={resetEmail}>
          <div>
            <InputLabel>パスワード変更</InputLabel>
            <p>登録したメールアドレスを入力してください。</p>
            <TextField
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="outlined">
              更新する
            </Button>
          </div>
        </form>
      </div>

      <div>
        <form onSubmit={deleteCurrentUser}>
          <Button type="submit">
            退会する
          </Button>
        </form>
      </div>
    </>
  )
}

export default Profile
