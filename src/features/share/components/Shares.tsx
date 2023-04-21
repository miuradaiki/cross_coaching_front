import React from "react"
import { ShareType } from "../../../models/share_model"
import { AnswerType } from "../../../models/answer_model"
import { QuestionType } from "../../../models/question_model"
import Link from "next/link"

type Props = {
  shares: ShareType[]
  questions: QuestionType[]
  answers: AnswerType[]
}

/* UIの描画のみ責務を持っている */
export const Shares: React.FC<Props> = (props) => {
  if (!props) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div>
        <ul>
          {props.shares && props.shares.map((share) => {
              // Shareに関連づいているAnswerを取得
              const answer = props.answers.find((answer) => answer.id === share.answer_id)
              if (!answer) return null // 関連するAnswerがなければリターン
              // Answerに関連づいているQuestionを取得
              const question = props.questions.find((question) => question.id === answer.question_id)
              if (!question) return null // 関連するQuestionがなければリターン
              return (
                <li key={share.id} className="mb-8">
                  <Link href={`/shares/${share.id}`}>
                    <div>
                      <div>{question.title}</div>
                      <div>{answer.description}</div>
                      <div>{share.description}</div>
                      <div>{share.created_at}</div>
                    </div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}

export default Shares