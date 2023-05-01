import React from "react"
import Head from "next/head"
import { useForm, SubmitHandler } from "react-hook-form"
import { AnswerType } from "src/models/answer_model"
import { QuestionType } from "src/models/question_model"
import { FeedbackType } from "src/models/feedback_model"
import { toast } from "react-toastify"
import { useAuthContext } from "context/AuthContext"
import axios from "axios"
import { useRouter } from "next/router"
import { VoteButton } from "src/features/vote/components/vote_button"

export type Props = {
  question?: QuestionType
  answer?: AnswerType
  feedbacks: FeedbackType[]
}

/* UIの描画のみ責務を持っている */
/* FIXME：フォーム追加によりロジックが増えたので切り出す */
export const Share: React.FC<Props> = (props: Props) => {
  const { currentUser } = useAuthContext()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackType>()

  const onSubmit: SubmitHandler<FeedbackType> = (feedbackInputData) => {
    createFeedback(feedbackInputData)
  }

  async function setConfig() {
    const token = await currentUser?.getIdToken()
    const config = {
      headers: { authorization: `Bearer ${token}` },
    }
    return config
  }

  async function createFeedback(feedbackInputData: FeedbackType) {
    const config = await setConfig()

    try {
      const response = await axios.post(
        "/api/v1/feedbacks",
        { feedback: {
            user_id: currentUser?.uid,
            answer_id: props.answer?.id,
            description: feedbackInputData.description,
          },
        },
        config
      )
      if (response.status === 200) {
        toast.success("フィードバックを投稿しました。")
        router.push("/shares")
        return response.data
      }
    } catch (err) {
      toast.error("フィードバックの投稿に失敗しました。")
      let message
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message)
      } else {
        message = String(err)
        console.error(message)
      }
    }
  }

  if (!props.answer) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Head>
        <title>シェア詳細</title>
        <meta name="description" content={props.answer.description} />
      </Head>
      <div className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {props.question?.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container px-5 mx-auto">
        {props.answer.description}
      </div>

      <div>Feedbacks</div>
      <div>
        <ul>
          {props.feedbacks.map((feedback) => (
            <li key={feedback.id}>
              {feedback.description}
              <span></span>
              <VoteButton feedbackId={feedback.id} userId={currentUser?.uid} totalUpVotes={feedback.total_up_votes}  totalDownVotes={feedback.total_down_votes} totalVotes={feedback.total_votes}/>
            </li>
          ))}
        </ul>
      </div>

      {/* フォーム */}
      <div className="container px-5 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="p-2 w-full">
              <div>
                <div
                  className="leading-7 text-sm text-gray-600"
                >
                  あなたのフィードバック
                </div>
                <textarea
                  {...register("description", { required: true, maxLength: 500 })}
                  id="description"
                  name="description"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
                {errors.description &&
                  "500文字以下で回答してください。"}
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                フィードバックを投稿する
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Share