import type { NextPage } from "next"
import Feedbacks from "../../src/features/feedback/components/Feedbacks"
import { useFetchMyFeedbacks } from "../../src/features/feedback/hooks/feedbacks"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const { feedbacks } = useFetchMyFeedbacks()

  return <Feedbacks feedbacks={feedbacks}/>
}

export default Page
