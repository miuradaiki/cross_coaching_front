import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Button } from "@mui/material"
import Link from "next/link"

import { signOut } from "firebase/auth"
import { useRouter } from "next/router"
import { auth } from "../initFirebase"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const handleLogout = async () => {
    await signOut(auth)
    await router.push("/login")
  }
  return (
    <>
      <Head>
        <title>Cross Coaching</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Image
            src="/crosscoaching_white_logo.png"
            alt="Cross Coaching Logo"
            width={500}
            height={80}
            priority
          />
        </div>
        <div>
          ユーザ登録は
          <Link href={"/signup"}>
            こちら
          </Link>
          から
        </div>
        <div>
          <Link href={"/login"}>
            すでに登録している人はこちら
          </Link>
        </div>
        <div>
          <Link href={"/questions"}>
            コーチングをはじめる
          </Link>
        </div>
        <div>
          <Link href={"/shares"}>
            シェア一覧
          </Link>
        </div>
        <div>
          <Link href={"/feedbacks"}>
            フィードバック一覧
          </Link>
        </div>
        <div className={styles.description}>
          <div>
            <Button type="submit" variant="outlined" onClick={handleLogout}>
              ログアウト
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
