import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { QuestionType } from "../../src/models/question_model"

type Props = {
  question: QuestionType
}

export const ListCard: React.FC<Props> = (props) => {
  const { question } = props

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 18 }} gutterBottom>
            {question.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {question.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ListCard
