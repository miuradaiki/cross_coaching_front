import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { FeedbackType } from "../../src/models/feedback_model"

type Props = {
  feedback: FeedbackType
}

export const ListCard: React.FC<Props> = (props) => {
  const { feedback } = props

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 18 }} gutterBottom>
            {feedback.feedback_description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {feedback.answer_description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ListCard
