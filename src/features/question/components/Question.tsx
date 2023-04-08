import React from "react"
import Head from "next/head"
import { QuestionType } from "../../../models/question_model"

export type Props = {
  question: QuestionType
}

/* UIの描画のみ責務を持っている */
export const Question: React.FC<Props> = (props) => {
  if (!props.question) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Head>
        <title>{props.question.title}</title>
        <meta name="description" content={props.question.description} />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {props.question.title}
            </h1>
            <p className="mb-8 leading-relaxed ">{props.question.description}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Question