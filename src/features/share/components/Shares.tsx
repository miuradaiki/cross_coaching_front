import React from "react"
import { ShareType } from "../../../models/share_model"
import { AnswerType } from "../../../models/answer_model"
import { QuestionType } from "../../../models/question_model"
import Link from "next/link"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styles from '@/styles/Share.module.css'
import Box from '@mui/material/Box'

type Props = {
  shares: ShareType[]
  questions: QuestionType[]
  answers: AnswerType[]
}

/* UIの描画のみ責務を持っている */
export const Shares: React.FC<Props> = (props) => {
  // 時刻の整形
  function formatCreatedAt(createdAt: string) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

    if (timeDiff >= oneDay) {
      // Return formatted date if more than 1 day has passed
      return createdDate.toISOString().split('T')[0];
    } else {
      // Calculate elapsed time in hours and minutes
      const hours = Math.floor(timeDiff / (60 * 60 * 1000));
      const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));

      return `${hours} 時間 ${minutes} 分前`
    }
  }

  if (!props) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div>
        <Container sx={{ maxWidth: 800 }} className={styles.container}>
        <div className={styles.title}>Shares</div>
        <div>Shares count: {props.shares && props.shares.length}</div>
          <Box sx={{ mt: 4 }}>
            <ul>
              {/* todo: コンポーネント化 */}
              {props.shares && props.shares.map((share) => {
                  // Shareに関連づいているAnswerを取得
                  const answer = props.answers.find((answer) => answer.id === share.answer_id)
                  if (!answer) return null // 関連するAnswerがなければリターン
                  // Answerに関連づいているQuestionを取得
                  const question = props.questions.find((question) => question.id === answer.question_id)
                  if (!question) return null // 関連するQuestionがなければリターン
                  return (
                    <li key={share.id} className="mb-8">
                      <Card variant="outlined">
                        <Link href={`/shares/${share.id}`}>
                          <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {question.title}
                          </Typography>
                          <Typography sx={{ fontSize: 18 }} gutterBottom>
                            {answer.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatCreatedAt(share.created_at)}
                          </Typography>
                        </CardContent>
                        </Link>
                      </Card>
                    </li>
                  )
                })}
            </ul>
          </Box>
        </Container>
      </div>
    </>
  )
}

export default Shares
