import type { NextPage } from "next"
import Question from "../../../src/features/question/components/Question"
import { useFetchQuestion } from "../../../src/features/question/hooks/question"
import { useFetchAnswer } from "../../../src/features/answer/hooks/answer"
import { useRouter } from "next/router"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { question } = useFetchQuestion(Number(id))
  const { answer } = useFetchAnswer(Number(id))

  return <Question question={question} answer={answer}/>
}

export default Page