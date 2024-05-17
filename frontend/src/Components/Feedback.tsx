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
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Question {
  _id: string;
  title: string;
}

function Feedback() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Question[]>("http://localhost:3000/questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const onSubmit = (formData: Record<string, number>) => {
    console.log(formData, "data");
    const ratings = questions.map((question) => ({
      questionId: question._id,
      rating: formData[question._id],
    }));
    axios
      .post("http://localhost:3000/ratings/feedback", { rates: ratings })
      .then((response) => {
        console.log("Ratings submitted successfully:", response.data);
        navigate("/response");
      })
      .catch((error) => {
        console.error("Error submitting ratings:", error);
      });
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#FFFFFF",
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
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "80px",
          }}
        >
          <Container maxWidth="md">
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`${process.env.PUBLIC_URL}/feedback.jpg`}
                alt="Feedback"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Submit Your Feedback
                </Typography>
                {questions.map((question) => (
                  <Box key={question._id} sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Figtree', sans-serif",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: question.title }}
                      />
                    </Typography>
                    <Controller
                      name={question._id}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Box>
                          <Rating {...field} />
                          {errors[question._id] && (
                            <Typography variant="caption" color="error">
                              This field is required
                            </Typography>
                          )}
                        </Box>
                      )}
                    />
                    <Divider sx={{ marginTop: "5px" }} />
                  </Box>
                ))}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </form>
    </>
  );
}

export default Feedback;
