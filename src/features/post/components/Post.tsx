import React from "react"
import { PostType } from "../../../models/post_model"

type Props = {
  posts: PostType[]
}

/* UIの描画のみ責務を持っている */
export const Post: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <ul>
          {props.posts.map((i) => (
            <li key={i.id}>
              {i.title}
              <span></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Post