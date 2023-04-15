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
