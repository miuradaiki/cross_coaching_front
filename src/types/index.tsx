export type PostType = {
  userId: number
  id: number
  title: string
  body:string
}

export interface PostInputs {
  title: string;
  body: string;
}

export interface PostData extends PostInputs {
  id: number;
  user_uid: string;
  created_at: string;
}

export type QuestionType = {
  id: number
  title: string
  description:string
}

export interface QuestionInputs {
  title: string;
  body: string;
}

export interface QuestionData extends QuestionInputs {
  id: number;
  user_id: string;
  created_at: string;
}

export interface AnswerInputs {
  title: string;
  body: string;
}

export interface AnswerData extends AnswerInputs {
  id: number;
  user_id: string;
  created_at: string;
}