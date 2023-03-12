import axios from "axios"
// types
import { PostType } from "../../src/models/post_model"

export const getPosts = async (): Promise<PostType[]> => {
  const result = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  return result.data
}

export const getPost = async (id: number): Promise<PostType> => {
  const result = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  return result.data
}

export const createPost = async (param: Omit<PostType, "id">) => {
  await axios.post("https://jsonplaceholder.typicode.com/posts", param)
}

export const updatePost = async (id: number) => {
  await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`)
}
export const deletePost = async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
}