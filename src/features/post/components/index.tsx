import React from 'react'
import { PostType } from "../../../models/post_model"

const Post: React.FC<PostType> = ({ title, body }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export default Post;
