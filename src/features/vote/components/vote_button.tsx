import { useState } from "react"
import axios from "axios"
import { useAuthContext } from "context/AuthContext"

export interface VoteButtonProps {
  feedbackId: number
  userId: string | undefined
  totalUpVotes: number
  totalDownVotes: number
  totalVotes: number
}

export const VoteButton = ({ feedbackId, userId, totalUpVotes, totalDownVotes, totalVotes }: VoteButtonProps) => {
  const { currentUser } = useAuthContext()
  const [votes, setVotes] = useState({
    upvotes: totalUpVotes,
    downvotes: totalDownVotes,
  })

  async function setConfig() {
    const token = await currentUser?.getIdToken()
    const config = {
      headers: { authorization: `Bearer ${token}` },
    }
    return config
  }

  const handleVote = async (type: "up" | "down") => {
    const config = await setConfig()

    if (!userId) {
      return
    }
    try {
      const response = await axios.post(
        "/api/v1/votes",
        {
          feedback_id: feedbackId,
          user_id: userId,
          vote_type: type,
        },
        config
      )
      if (response.status === 200) {
        const data = response.data

        setVotes({
          upvotes: data.upvotes,
          downvotes: data.downvotes,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <button
        onClick={() => handleVote("up")}
        className="border p-2"
      >
        Upvote ({votes.upvotes})
      </button>
      <button
        onClick={() => handleVote("down")}
        className="border p-2"
      >
        Downvote ({votes.downvotes})
      </button>
      <span>Total votes: {totalVotes}</span>
    </>
  )
}
