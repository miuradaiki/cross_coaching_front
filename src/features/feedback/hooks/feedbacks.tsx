import { useState } from "react"
import { useAsync } from "react-use"
import { feedbackRepository } from "../../../repositories/feedback_repository"
import { FeedbackType } from "../../../models/feedback_model"

/* 責務: feedbacksのAPI通信をしデータをstateに格納しておく */
export const useFetchMyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])

  useAsync(async () => {
    try {
      const response = await feedbackRepository.getMyFeedbacks()
      setFeedbacks(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    feedbacks: feedbacks,
  }
}
