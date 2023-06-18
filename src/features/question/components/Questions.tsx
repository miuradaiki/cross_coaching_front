import React from "react"
import { QuestionType } from "../../../models/question_model"
import Link from "next/link"
import { ListCard } from "../../../../components/ListCard"
import styles from '@/styles/Question.module.css'
import { spacing } from '@mui/system'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

type Props = {
  questions: QuestionType[]
}

/* UIの描画のみ責務を持っている */
export const Questions: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <Container sx={{ maxWidth: 800 }} className={styles.container}>
          <div className={styles.title}>Self-Coaching Questions</div>
          <Box sx={{ mt: 4 }}>
            <ul>
              {props.questions &&
                props.questions.map((question) => (
                  <Box sx={{ my: 1 }} key={question.id}>
                    <li>
                      <Link href={`/questions/${question.id}`}>
                        <ListCard question={question} />
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

export default Questions
