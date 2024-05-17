import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Rating,
  Toolbar,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface Question {
  _id: string;
  title: string;
}

function Feedback() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<Question[]>("http://localhost:3000/questions")
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const onSubmit = (formData: Record<string, number>) => {
    const ratings = questions.map(question => ({
      questionId: question._id,
      rating: formData[question._id]
    }));

    axios.post("http://localhost:3000/ratings/feedback", { rates: ratings })
    .then(response => {
      console.log("Ratings submitted successfully:", response.data);
      navigate('/createquestions');
    })
    .catch(error => {
      console.error("Error submitting ratings:", error);
    });
};

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", paddingX: 2 }}>
          <img
            src={`${process.env.PUBLIC_URL}/navimg.png`}
            alt="Starlight Surveyor"
            style={{ height: "50px" }}
          />
          <Avatar
            alt="User Avatar"
            src={`${process.env.PUBLIC_URL}/avatar.png`}
          />
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            backgroundColor: "#E7FCFB",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="md">
            <Card sx={{ marginTop: "100px" }}>
              <CardMedia
                component="img"
                height="200"
                width="100"
                image="feedback.jpg"
                alt="Placeholder"
                sx={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: -150,
                  left: -280,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Submit Your Feedback
                </Typography>
              </Box>
              {questions.map(question => (
                <CardContent key={question._id}>
                  <Typography variant="subtitle1">{question.title}</Typography>
                  <Controller
                    name={question._id}
                    control={control}
                    // defaultValue={0}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div>
                        <Rating {...field} />
                        {errors[question._id] && <Typography variant="caption" color="error">This field is required</Typography>}
                      </div>
                    )}
                  />
                  <Divider sx={{ marginTop: "5px" }} />
                </CardContent>
              ))}
              <CardContent>
                <Button type="submit">Submit</Button>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </form>
    </>
  );
}

export default Feedback;
