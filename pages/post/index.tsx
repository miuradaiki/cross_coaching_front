import type { NextPage } from "next"
// components
import Post from "../../src/features/post/components"
// // hooks
import { useFetchPosts } from "../../src/features/post/hooks"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const { posts } = useFetchPosts()

  return <Post posts={posts} />
}

export default Page