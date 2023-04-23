import { useState } from "react"
import { useAsync } from "react-use"
import { feedbackRepository } from "../../../repositories/feedback_repository"
import { FeedbackType } from "../../../models/feedback_model"

/* 責務: feedbackのAPI通信をしデータをstateに格納しておく */
export const useFetchFeedbacks = (id: number) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])

  useAsync(async () => {
    try {
      const response = await feedbackRepository.getFeedbacks({ id })
      setFeedbacks(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    feedbacks: feedbacks,
  }
}