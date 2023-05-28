import type { NextPage } from "next"
import Profile from "../src/features/profile/components/Profile"
import { useFetchProfile } from "../src/features/profile/hooks"

/* 責務はAPI通信とページの表示 */
const Page: NextPage = () => {
  const { profile } = useFetchProfile()

  return <Profile profile={ profile } />
}

export default Page
