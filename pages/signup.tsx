import type { NextPage } from 'next'
import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { useAuthContext } from "../context/AuthContext"
import { auth } from "../initFirebase"
import axios from "axios"

const SignUp: NextPage = () => {
  const router = useRouter()
  const { currentUser } = useAuthContext()
  const isLoggedIn = !!currentUser
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const createUserAndSendUid = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const uid = userCredential.user.uid
    await axios.post("/api/v1/users", { email, uid })
    return uid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const uid = await createUserAndSendUid(email, password)
    router.push("/")
  }
  const handleClose = async () => {
    await router.push("/")
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
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
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <Button type="submit" variant="outlined">
            登録
          </Button>
        </div>
        <div>
          <Link href={"/login"}>
            すでに登録している人はこちら
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp