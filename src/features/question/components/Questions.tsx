import React from "react"
import { QuestionType } from "../../../models/question_model"
import Link from "next/link"

type Props = {
  questions: QuestionType[]
}

/* UIの描画のみ責務を持っている */
export const Questions: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <ul>
          {props.questions && props.questions.map((i) => (
            <li key={i.id}>
              <Link href={`/questions/${i.id}`}>
                {i.title}
              </Link>
              <span></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Questions
