/* ログイン＆ログアウト機能のテスト用ページ */

import type { NextPage } from 'next'
import { useAuthContext } from "../context/AuthContext"
import { useRouter } from "next/router"
import LoginForm from "../components/LoginForm"

const Logintest: NextPage = () => {
  // ログイン状況を取得
  const { currentUser, loading, logout } = useAuthContext()
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>ログイン＆ログアウト機能のテスト用ページ</h1>
      <br/>
      <br/>
      { !loading && !currentUser && <h2>未ログイン</h2> }
      { !loading && currentUser && <h2>ログイン済み</h2> }
      <LoginForm />
      { !loading && currentUser &&
      <button onClick={logout}
        className="w-[330px] bg-slate-200 border-solid border border-slate-300
          rounded-md cursor-pointer hover:bg-slate-300">
        Log out
      </button> }
    </div>
  )
}

export default Logintest