import StarIcon from "@mui/icons-material/Star";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

interface QuestionStats {
  avg_rating: number;
  total_responses: number;
  question: string;
}

function Response() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [questionStats, setQuestionStats] = useState<QuestionStats[]>([]);
  const [totalAvgRating, setTotalAvgRating] = useState<number | null>(null);

  const fetchQuestionStats = async () => {
    try {
      const response = await axios.get<{
        _id: null;
        questionStats: QuestionStats[];
        total_avg_rating: number;
      }>("http://localhost:3000/ratings");
      return response.data;
    } catch (error) {
      console.error("Error fetching question stats:", error);
      return { questionStats: [], total_avg_rating: null };
    }
  };

  const fetchDateRangeStats = async () => {
    if (!startDate || !endDate) {
      setMessage("Select both start and end dates.");
      return { questionStats: [], total_avg_rating: null };
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/ratings?start=${startDate}&end=${endDate}`
      );
      if (response.status === 204) {
        setMessage("No responses available for the selected date range.");
        return { questionStats: [], total_avg_rating: null };
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching date range stats:", error);
      return { questionStats: [], total_avg_rating: null };
    }
  };

  const { isError } = useQuery("questionStats", fetchQuestionStats, {
    onSuccess: (data) => {
      setQuestionStats(data.questionStats);
      setTotalAvgRating(data.total_avg_rating);
    },
  });

  const { mutate: submitDateRangeMutation } = useMutation(fetchDateRangeStats, {
    onSuccess: (data) => {
      setQuestionStats(data.questionStats);
      setTotalAvgRating(data.total_avg_rating);
      setMessage(
        data.questionStats.length === 0 ? "No responses available" : ""
      );
    },
  });

  useEffect(() => {
    if (startDate && endDate) {
      submitDateRangeMutation();
    }
  }, [startDate, endDate, submitDateRangeMutation]);

  const handleDateChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
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
      <Box
        sx={{
          backgroundColor: "#E7FCFB",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "80px",
          paddingBottom: "40px",
        }}
      >
        <Container maxWidth="md">
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="200"
                image="response.png"
                alt="Response Image"
                sx={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  padding: "20px",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  User Responses
                </Typography>
                {totalAvgRating !== null && (
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Total Average Rating: {totalAvgRating?.toFixed(1)}
                  </Typography>
                )}
              </Box>
            </Box>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Select Date Range:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleDateChange(setStartDate)}
                    style={{ marginRight: 10 }}
                    required
                  />
                  <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                    to
                  </Typography>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleDateChange(setEndDate)}
                    required
                  />
                </Box>
              </Box>
              {message && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 2 }}
                >
                  {message}
                </Typography>
              )}
              {isError && (
                <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                  Error fetching question stats.
                </Typography>
              )}
              {questionStats.length > 0 ? (
                questionStats.map((stat, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: stat.question }}
                      />
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <StarIcon style={{ color: "gold" }} />
                      <Typography variant="subtitle2" sx={{ marginLeft: 1 }}>
                        Responses: {stat.total_responses}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ marginLeft: 3 }}>
                        Average Rating: {stat.avg_rating.toFixed(1)}
                      </Typography>
                    </Box>
                    <Divider sx={{ marginTop: "5px" }} />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No ratings available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default Response;
