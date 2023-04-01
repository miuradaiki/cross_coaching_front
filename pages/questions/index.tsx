import type { NextPage } from "next"
// components
import Question from "../../src/features/question/components/Questions"
// // hooks
import { useFetchQuestions } from "../../src/features/question/hooks"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const { questions } = useFetchQuestions()

  return <Question questions={questions} />
}

export default Page