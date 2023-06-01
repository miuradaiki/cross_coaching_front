import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "../context/AuthContext"
import { auth } from "../initFirebase"

const Login = () => {
  const { currentUser } = useAuthContext()
  const isLoggedIn = !!currentUser
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
    router.push("/")
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const handleClose = async () => {
    await router.push("/")
  }

  return (
    <div>
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar>
      <Snackbar
        open={!isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
      >
        <Alert severity="warning">ログインしてください</Alert>
      </Snackbar>

      <div className="mt-40">
        <div className="flex justify-center">
          <div>
            <h2 className="text-center text-4xl">Login</h2>
            <form onSubmit={handleSubmit} className="w-72 mt-10">
              <div>
                <TextField
                  name="email"
                  type="email"
                  size="small"
                  label="メールアドレス"
                  margin="normal"
                  fullWidth
                  onChange={handleChangeEmail}
                />
              </div>
              <div>
                <TextField
                  name="password"
                  type="password"
                  size="small"
                  label="パスワード"
                  margin="normal"
                  fullWidth
                  onChange={handleChangePassword}
                />
              </div>
              <div className="text-center mt-8">
                <Button type="submit" variant="outlined">
                  ログインする
                </Button>
              </div>
              <div className="text-center mt-10">
                ユーザ登録は
                <Link href={"/signup"} className="text-sky-600 underline decoration-sky-400">
                  こちら
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
