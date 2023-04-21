import { useState } from "react"
import { useAsync } from "react-use"
import { shareRepository } from "../../../repositories/share_repository"
import { ShareType } from "../../../models/share_model"

/* 責務: sharesのAPI通信をしデータをstateに格納しておく */
export const useFetchShares = () => {
  const [shares, setShares] = useState<ShareType[]>([])

  useAsync(async () => {
    try {
      const response = await shareRepository.getShares()
      setShares(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    shares: shares,
  }
}