import type { NextPage } from "next"
// components
import Questions from "../../src/features/question/components/Questions"
// // hooks
import { useFetchQuestions } from "../../src/features/question/hooks"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const { questions } = useFetchQuestions()

  return <Questions questions={questions} />
}

export default Page