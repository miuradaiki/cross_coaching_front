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
    await sendEmailVerification(userCredential.user)
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

      <div className="mt-40">
        <div className="flex justify-center">
          <div>
            <h2 className="text-center text-4xl">Sign up</h2>
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
                  name="last_name"
                  type="name"
                  size="small"
                  label="姓"
                  margin="normal"
                  fullWidth
                  onChange={handleChangeEmail}
                  />
              </div>
              <div>
                <TextField
                  name="first_name"
                  type="name"
                  size="small"
                  label="名"
                  margin="normal"
                  fullWidth
                  onChange={handleChangeEmail}
                  />
              </div>
              <div className="text-xs">※匿名サービスのため名前は公開されません</div>
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
                  登録する
                </Button>
              </div>
              <div className="text-center mt-10">
                すでに登録している人は
                <Link href={"/login"} className="text-sky-600 underline decoration-sky-400">
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

export default SignUp
