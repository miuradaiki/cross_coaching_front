export type PostType = {
  userId: number
  id: number
  title: string
  body:string
}

export interface PostInputs {
  title: string
  body: string
}

export interface PostData extends PostInputs {
  id: number
  user_uid: number
  created_at: string
}

export type QuestionType = {
  id: number
  title: string
  description:string
}

export interface QuestionInputs {
  title: string
  description: string
}

export interface QuestionData extends QuestionInputs {
  id: number
  title: string
  description: string
}

export type AnswerType = {
  id: number
  user_id: number
  description:string
}

export interface AnswerInputs {
  description: string
}

export interface AnswerData extends AnswerInputs {
  id: number
  user_id: number
  question_id: number
  description: string
  created_at: string
}