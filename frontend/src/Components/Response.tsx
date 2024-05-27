import StarIcon from "@mui/icons-material/Star";
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
import { useNavigate } from "react-router-dom";
interface Rating {
  question: string;
  avg_rating?: number;
  total_responses: number;
}
function Response() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchRatings();
  }, []);
  const fetchRatings = () => {
    axios
      .get("http://localhost:3000/ratings")
      .then(({ data }) => {
        console.log();
        if (Array.isArray(data.questionStats)) {
          setRatings(data.questionStats);
        } else {
          console.error("Unexpected response data:", data.questionStats);
          setRatings([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
        setRatings([]);
      });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!startDate || !endDate) {
      setMessage(" select both start and end dates.");
      return;
    }
    axios
      .post("http://localhost:3000/ratings/date-range", {
        start: startDate,
        end: endDate,
      })
      .then((response) => {
        console.log("Response submitted successfully:", response);
        if (Array.isArray(response.data)) {
          setRatings(response.data);
          if (response.data.length === 0) {
            setMessage("No responses available ");
          } else {
            setMessage("");
          }
        } else {
          console.error("Unexpected response data:", response.data);
          setRatings([]);
        }
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
      });
  };
  console.log(ratings);
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
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Average Rating:
                </Typography>
              </Box>
            </Box>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Select Date Range:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ marginRight: 10 }}
                      required
                    />
                    <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                      to
                    </Typography>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </Box>
                </Box>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </form>
              {message && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 2 }}
                >
                  {message}
                </Typography>
              )}
              {Array.isArray(ratings) && ratings.length > 0 ? (
                ratings.map((rating, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: rating?.question }}
                      />
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <StarIcon style={{ color: "gold" }} />
                      <Typography variant="subtitle2" sx={{ marginLeft: 1 }}>
                        Responses: {rating?.total_responses}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ marginLeft: 3 }}>
                        Average Rating:{" "}
                        {rating?.avg_rating !== undefined
                          ? rating?.avg_rating.toFixed(1)
                          : "N/A"}
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
