import React from "react"
import { FeedbackType } from "../../../models/feedback_model"
import Link from "next/link"

type Props = {
  feedbacks: FeedbackType[]
}

/* UIの描画のみ責務を持っている */
export const Feedbacks: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <ul>
          {props.feedbacks && props.feedbacks.map((i) => (
            <li key={i.id}>
              <Link href={`answers/${i.answer_id}`}>
                {i.answer_description}
                /
                {i.feedback_description}
              </Link>
              <span></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Feedbacks
