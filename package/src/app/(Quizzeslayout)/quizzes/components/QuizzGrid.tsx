import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Quiz {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  imageUrl: string;
}

interface QuizzGridProps {
  quizzes: Quiz[];
}

const QuizzGrid: React.FC<QuizzGridProps> = ({ quizzes }) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    router.push(`/quiz/update/${id}`);
  };

  return (
    <Grid container spacing={2}>
      {quizzes.map((quiz) => (
        <Grid item xs={12} sm={6} md={4} key={quiz.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={quiz.imageUrl}
              alt={quiz.title}
              style={{ height: 200, objectFit: 'cover', objectPosition: 'center' }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {quiz.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {quiz.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Created on: {new Date(quiz.createdDate).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleUpdate(quiz.id)}>
                Update
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuizzGrid;
