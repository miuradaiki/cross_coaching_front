// hooks
import { useState } from "react"
import { useAsync } from "react-use"

// api
import { getPosts } from "../../../../pages/api/post"

// types
import { PostType } from "../../../models/post_model"

/* 責務: postsのAPI通信をしデータをstateに格納しておく */
export const useFetchPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([])

  useAsync(async () => {
    try {
      const response = await getPosts()
      setPosts(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    posts: posts,
  }
}