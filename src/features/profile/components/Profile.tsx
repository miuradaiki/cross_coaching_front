import React, { useState } from "react"
import { ProfileType } from "../../../models/profile_model"
import { InputLabel, TextField, Button } from "@mui/material"
import { getAuth, sendPasswordResetEmail, deleteUser, signOut } from "firebase/auth"
import axios from "axios"
import { useAuthContext } from "context/AuthContext"
import { useRouter } from "next/router"
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import styles from '@/styles/Profile.module.css'

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
      <Container sx={{ maxWidth: 800 }} className={styles.container}>
        <Box sx={{ mt: 4 }}>
          <h1 className={styles.title}>Profile</h1>
          <form onSubmit={resetEmail}>
            <div className="flex justify-center">
              <div>
                <Typography sx={{ mt: 4 }} textAlign="center">
                  パスワード変更
                </Typography>
                <Typography sx={{ mt: 1 }} textAlign="center" variant="body2" color="text.secondary">
                  登録したメールアドレスを入力してください。
                </Typography>
                <Box sx={{ mt: 4, maxWidth: 320 }} textAlign="center">
                  <TextField
                    name="email"
                    type="email"
                    size="small"
                    label="メールアドレス"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box sx={{ mt: 4 }} textAlign="center">
                  <Button type="submit" variant="outlined">
                    更新する
                  </Button>
                </Box>
              </div>
            </div>
          </form>
        </Box>
        <Box sx={{ mt: 12 }} textAlign="center">
          <div>
            <form onSubmit={deleteCurrentUser}>
              <Button type="submit">
                退会する
              </Button>
            </form>
          </div>
        </Box>
      </Container>
      </div>

    </>
  )
}

export default Profile
