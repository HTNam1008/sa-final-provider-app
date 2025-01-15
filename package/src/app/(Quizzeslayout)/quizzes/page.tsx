'use client'
import React, { useState, useEffect } from 'react';
import {Alert, Typography, Box, Stack, TextField, Button, CircularProgress } from '@mui/material';
import QuizzGrid from './components/QuizzGrid';
import CreateQuizzButton from './components/CreateQuizzButton';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

interface Quiz {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  imageUrl: string;
}

const QuizPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sample data - replace with actual API call
  // const quizzes: Quiz[] = [
  //   {
  //     id: '1',
  //     title: 'Sample Quiz 1',
  //     description: 'This is a description for Sample Quiz 1',
  //     createdDate: '2025-01-01',
  //     imageUrl: '/images/quizzes/quiz.jpg',
  //   },
  //   {
  //     id: '2',
  //     title: 'Sample Quiz 2',
  //     description: 'This is a description for Sample Quiz 2',
  //     createdDate: '2025-01-02',
  //     imageUrl: '/images/quizzes/quiz.jpg',
  //   },
  //   {
  //     id: '3',
  //     title: 'Sample Quiz 3',
  //     description: 'This is a description for Sample Quiz 3',
  //     createdDate: '2025-01-02',
  //     imageUrl: '/images/quizzes/quiz.jpg',
  //   },
  //   // Add more sample data as needed
  // ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer title="Quizzes" description="Quiz Management">
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h2" component="h1">
            Quizz Management
          </Typography>
        </Stack>
      <Box sx={{ width: '100%', padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <TextField
            label="Search Quizzes"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => router.push('/quizzes/create')}
          >
            Create Quizz
          </Button>
        </Stack>
        {loading && <CircularProgress />}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && <QuizzGrid quizzes={filteredQuizzes} />}
      </Box>
    </PageContainer>
  );
};

export default QuizPage;
