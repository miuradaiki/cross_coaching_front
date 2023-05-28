import { useState } from "react"
import { useAsync } from "react-use"
import { profileRepository } from "../../../repositories/profile_repository"
import { ProfileType } from "../../../models/profile_model"

/* 責務: profileのAPI通信をしデータをstateに格納しておく */
export const useFetchProfile = () => {
  const [profile, setProfile] = useState<ProfileType>()

  useAsync(async () => {
    try {
      const response = await profileRepository.getProfile()
      setProfile(response)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return {
    profile: profile,
  }
}
