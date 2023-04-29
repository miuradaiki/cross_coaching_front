import type { NextPage } from "next"
import Share from "../../../src/features/share/components/Share"
import { useFetchQuestion } from "../../../src/features/question/hooks/question"
import { useFetchAnswer } from "../../../src/features/answer/hooks/answer"
import { useFetchFeedbacks } from "../../../src/features/feedback/hooks"
import { useRouter } from "next/router"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { question } = useFetchQuestion(Number(id))
  const { answer } = useFetchAnswer(Number(id))
  const { feedbacks } = useFetchFeedbacks(Number(id))

  return <Share question={question} answer={answer} feedbacks={feedbacks}/>
}

export default Page