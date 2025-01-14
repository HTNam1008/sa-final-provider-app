'use client'

import { useState, ChangeEvent } from 'react'
import { Box, Button, TextField, Typography, Stack, Paper, Grid, IconButton, MenuItem, FormControlLabel, Checkbox, Collapse } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
import { useRouter } from 'next/navigation'

interface Option {
  option: string
  isCorrect: boolean
}

interface Question {
  question: string
  options: Option[]
  answer: string
}

interface FormData {
  name: string
  category: string
  description: string
}

const categories = ['General Knowledge', 'Science', 'History', 'Technology', 'Sports']

export default function CreateQuiz() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    description: ''
  })
  const [questions, setQuestions] = useState<Question[]>([{ question: '', options: [{ option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }], answer: '' }])
  const [expandQuestions, setExpandQuestions] = useState(false)
  const router = useRouter()

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: [{ option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }], answer: '' }
    ])
  }

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index)
    setQuestions(updatedQuestions)
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string, isCorrect: boolean) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex].option = value
    updatedQuestions[questionIndex].options[optionIndex].isCorrect = isCorrect
    setQuestions(updatedQuestions)
  }

  const handleCreateQuiz = async () => {
    const quizData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      questions: questions.map((question) => ({
        question: question.question,
        options: question.options.map((option) => ({
          option: option.option,
          isCorrect: option.isCorrect,
        })),
        answer: question.answer,
      })),
    }

    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      })

      if (!response.ok) {
        throw new Error('Failed to create quiz')
      }

      router.push('/quiz')
    } catch (error) {
      console.error('Error creating quiz:', error)
      // Xử lý lỗi nếu có
    }
  }

  return (
    <PageContainer title="Create Quiz" description="Create a new quiz">
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Stack spacing={3}>
          {/* Quiz Image Upload */}
          <Paper sx={{ p: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ width: '100%', height: '100px' }}
            >
              Upload Quiz Image
              <input type="file" hidden accept="image/*" />
            </Button>
          </Paper>

          {/* Quiz Basic Information */}
          <TextField
            required
            fullWidth
            label="Quiz Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            select
            required
            fullWidth
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          {/* Quiz Description */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Questions Expansion */}
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Questions</Typography>
              <IconButton onClick={() => setExpandQuestions(!expandQuestions)}>
                <ExpandMoreIcon />
              </IconButton>
            </Stack>
            <Collapse in={expandQuestions}>
              {questions.map((question, questionIndex) => (
                <Grid container spacing={2} key={questionIndex} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={`Question ${questionIndex + 1}`}
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuestions = [...questions]
                        updatedQuestions[questionIndex].question = e.target.value
                        setQuestions(updatedQuestions)
                      }}
                    />
                  </Grid>

                  {/* Options */}
                  {question.options.map((option, optionIndex) => (
                    <Grid item xs={12} sm={6} key={optionIndex}>
                      <TextField
                        fullWidth
                        label={`Option ${optionIndex + 1}`}
                        value={option.option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value, option.isCorrect)}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={option.isCorrect}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, option.option, e.target.checked)}
                          />
                        }
                        label="Correct Answer"
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Button color="secondary" onClick={() => handleRemoveQuestion(questionIndex)}>
                      Remove Question
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button sx={{ mt: 2 }} onClick={handleAddQuestion}>
                Add Question
              </Button>
            </Collapse>
          </Paper>

          {/* Create Quiz Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCreateQuiz}
          >
            Create Quiz
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  )
}
