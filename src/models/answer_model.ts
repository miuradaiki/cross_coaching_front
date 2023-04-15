export type AnswerType = {
  id: number
  user_id: number
  question_id: number
  description: string
  created_at: string
}

export interface AnswerData {
  id: number
  user_id: number
  question_id: number
  description: string
  created_at: string
}