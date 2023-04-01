import React from "react"
import { QuestionType } from "../../../models/question_model"

type Props = {
  questions: QuestionType[]
}

/* UIの描画のみ責務を持っている */
export const Question: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <ul>
          {props.questions.map((i) => (
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

export default Question