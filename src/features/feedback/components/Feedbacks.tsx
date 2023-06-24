import React from "react"
import { FeedbackType } from "../../../models/feedback_model"
import Link from "next/link"
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import styles from '@/styles/Feedbacks.module.css'
import { ListCard } from "../../../../components/feedbacks/ListCard"

type Props = {
  feedbacks: FeedbackType[]
}

/* UIの描画のみ責務を持っている */
export const Feedbacks: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <Container sx={{ maxWidth: 800 }} className={styles.container}>
          <div className={styles.title}>Feedbacks</div>
          <div>Feedbacks count: {props.feedbacks && props.feedbacks.length}</div>
          <Box sx={{ mt: 4 }}>
            <ul>
              {props.feedbacks && props.feedbacks.map((feedback) => (
                <Box sx={{ my: 1 }} key={feedback.id}>
                  <li>
                    <Link href={`answers/${feedback.answer_id}`}>
                      <ListCard feedback={feedback} />
                    </Link>
                  </li>
                </Box>
              ))}
            </ul>
          </Box>
        </Container>
      </div>
    </>
  )
}

export default Feedbacks
