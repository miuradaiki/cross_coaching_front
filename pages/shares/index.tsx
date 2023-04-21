import type { NextPage } from "next"
import Shares from "../../src/features/share/components/Shares"
import { useFetchShares } from "../../src/features/share/hooks"
import { useFetchQuestions } from "../../src/features/question/hooks"
import { useFetchAnswers } from "../../src/features/answer/hooks"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const { shares } = useFetchShares()
  const { questions } = useFetchQuestions()
  const { answers } = useFetchAnswers()

  return <Shares shares={shares} questions={questions} answers={answers}/>
}

export default Page