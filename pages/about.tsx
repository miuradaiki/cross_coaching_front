import type { NextPage } from 'next'
import { Alert, Snackbar } from "@mui/material"
import { useAuthContext } from "../context/AuthContext"

const About: NextPage = () => {
  const { currentUser } = useAuthContext()
  const isLoggedIn = !!currentUser
  return (
    <div>
      <h1 className="text-blue-700 underline decoration-gray-500">
        Hello World!
      </h1>
      <p>
        add CircleCI!
      </p>
      <Snackbar
        open={!isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
      >
        <Alert severity="warning">ログインしてください</Alert>
      </Snackbar>
    </div>
  )
}

export default About