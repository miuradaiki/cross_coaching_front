import { ApiClient } from "../lib/api-client"
import { PostType } from "../models/post_model"

export type PostRepository = {
  getPosts: () => Promise<PostType[]>
  getPost: (params: Pick<PostType, "id">) => Promise<PostType>
  createPost: (
    params: Omit<PostType, "id">
  ) => Promise<void>
  deletePost: (params: Pick<PostType, "id">) => Promise<void>
}

const getPosts : PostRepository["getPosts"] = async (): Promise<PostType[]> => {
  const response = await ApiClient.get(`/posts`)
  return response.data
}

const getPost : PostRepository["getPost"] = async (params: Pick<PostType, "id">): Promise<PostType> => {
  const response = await ApiClient.get(`/posts/${params.id}`)
  return response.data
}

const createPost : PostRepository["createPost"] = async (
  params: Omit<PostType, "id">
) => {
  await ApiClient.post(`/posts`, params)
}

const deletePost : PostRepository["deletePost"] = async (params: Pick<PostType, "id">) => {
  await ApiClient.post(`/posts/${params.id}`, params)
}

export const postRepository: PostRepository = {
  getPosts,
  getPost,
  createPost,
  deletePost,
}