import React from "react"
import Head from "next/head"
import { useForm, SubmitHandler } from "react-hook-form"
import { AnswerType } from "src/models/answer_model"
import { QuestionType } from "src/models/question_model"
import { toast } from "react-toastify"
import { useAuthContext } from "context/AuthContext"
import axios from "axios"
import { useRouter } from "next/router"

export type Props = {
  question?: QuestionType
  answer?: AnswerType
}

/* UIの描画のみ責務を持っている */
/* FIXME：フォーム追加によりロジックが増えたので切り出す */
export const Question: React.FC<Props> = (props: Props) => {
  const { currentUser } = useAuthContext()
  const router = useRouter()
  const answer = props.answer
  const isAddMode = !props.answer

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnswerType>()

  const onSubmit: SubmitHandler<AnswerType> = (answerInputData) => {
    if (props.answer) {
      return isAddMode
        ? createAnswer(answerInputData)
        : updateAnswer(props.answer.id, answerInputData)
    }
    return null
  }

  async function setConfig() {
    const token = await currentUser?.getIdToken()
    const config = {
      headers: { authorization: `Bearer ${token}` },
    }
    return config
  }

  async function createAnswer(answerInputData: AnswerType) {
    const config = await setConfig()

    try {
      const response = await axios.post(
        "/api/v1/answers",
        { answer: {
            user_id: currentUser?.uid,
            question_id: props.question?.id,
            description: answerInputData.description,
          },
        },
        config
      )
      if (response.status === 200) {
        toast.success("回答を保存しました。")
        router.push("api/v1/questions")
        return response.data
      }
    } catch (err) {
      toast.error("投稿に失敗しました。")
      let message
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message)
      } else {
        message = String(err)
        console.error(message)
      }
    }
  }

  async function updateAnswer(id: number, answerInputData: AnswerType) {
    const config = await setConfig()

    try {
      const response = await axios.patch(
        `api/v1/answers/${id}`,
        { answer: answerInputData },
        config
      )
      console.log(response.data)
      if (response.status === 200) {
        toast.success("Answer is updated successfully!")
        router.push(`/answers/${id.toString()}`)
        return response.data
      }
    } catch (err) {
      toast.error("Failure: something wrong happened!")
      let message
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message)
      } else {
        message = String(err)
        console.error(message)
      }
    }
  }

  // 回答のシェア
  async function shareAnswer () {
    const answer_id = props.answer?.id
    console.log(answer_id)
    const result = confirm("本当にシェアしますか？シェアした回答は他のユーザーも閲覧できます。")
    if (result) {
      const config = await setConfig()

      try {
        const response = await axios.post(
          `api/v1/shares`,
          { share: {
              user_id: currentUser?.uid,
              answer_id: answer_id
            },
          },
          config
        )
        if (response.status === 200) {
          router.reload()
        }
      } catch (err) {
        let message
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message)
        } else {
          message = String(err)
          console.error(message)
        }
      }
    }
  }

  if (!props.question) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Head>
        <title>{props.question.title}</title>
        <meta name="description" content={props.question.description} />
      </Head>
      <div className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {props.question.title}
            </h1>
            <p className="mb-8 leading-relaxed ">{props.question.description}</p>
          </div>
        </div>
      </div>

      {/* フォーム */}
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -m-2"
          >
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm text-gray-600"
                >
                  あなたの回答
                </label>
                <textarea
                  {...register("description", { required: true, maxLength: 500 })}
                  defaultValue={answer ? answer.description : ""}
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
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {isAddMode ? "回答を保存する" : "回答を更新する"}
              </button>
            </div>
          </form>
          <div className="p-2 w-full">
              <button
                onClick={shareAnswer}
                disabled={isAddMode}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {isAddMode ? "回答後シェアができます" : "シェアする"}
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Question