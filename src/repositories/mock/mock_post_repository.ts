import { PostType } from "../../models/post_model"
import { PostRepository } from "../post_repository"

const getPosts = async (): Promise<PostType[]> => {
  const response = [
    {
      userId: 1,
      id: 1,
      title: "タイトル1",
      body: "本文1",
    },
    {
      userId: 2,
      id: 2,
      title: "タイトル2",
      body: "本文2",
    },
  ]
  return response
}

const getPost = async (params: Pick<PostType, "id">): Promise<PostType> => {
  const response = {
    userId: 1,
    id: 1,
    title: "タイトル",
    body: "本文",
  }
  return response
}

const createPost = async (params: Omit<PostType, "id">) => {}

const deletePost = async (params: Pick<PostType, "id">) => {}

export const mockPostRepository: PostRepository = {
  getPosts,
  getPost,
  createPost,
  deletePost,
}