import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

interface Question {
  id: number;
  title: string;
}
const CreateQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuestion("");
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  const handleCreateQuestion = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:3000/questions", {
        title: question,
      });
      setQuestion("");
      setOpen(false);
      fetchQuestions();
    } catch (error) {
      console.error("Error creating question:", error);
      setError("Failed to create question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions ? 
  questions.filter((q) => q.title.toLowerCase().includes(searchQuery.toLowerCase())) :
  [];

  const handleClick = () => {
    navigate("/feedback"); 
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E0F7FA",
        paddingTop: "64px",
        overflowX: "hidden",
      }}
    >
      <style>
        {` @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap');`}
      </style>
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
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          marginTop: "80px",
        }}
      >
        {questions.length === 0 ? (
          <>
            <img
              src={`${process.env.PUBLIC_URL}/placeholder.png`}
              alt="Placeholder"
              style={{ width: "100px", height: "100px" }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginTop: "20px",
                fontFamily: "'Figtree', sans-serif",
              }}
            >
              No Questions Available
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "10px",
                color: "text.secondary",
                fontWeight: "bold",
                fontFamily: "'Figtree', sans-serif",
              }}
            >
              Tap on create question to add a new question
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: "20px",
                fontFamily: "'Figtree', sans-serif",
                fontWeight: "bold",
              }}
              onClick={handleClickOpen}
            >
              Create Question
            </Button>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    fontFamily: "'Figtree', sans-serif",
                  }}
                >
                  Added Questions:
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  sx={{ width: "330px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginRight: "10px",
                    marginLeft: "200px",
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: "bold",
                    padding: "12px 24px",
                  }}
                  onClick={handleClickOpen}
                >
                  Create Question
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: "10px",
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: "bold",
                    padding: "12px 24px",
                  }}
                  onClick={() => {
                    navigate("/response");
                  }}
                >
                  View Responses
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: "bold",
                    padding: "12px 24px",
                  }}

                  onClick={() => {
                    navigate("/feedback");
                  }}
                >
                  View Form
                </Button>
              </Box>
            </Box>
            {loading ? (
              <CircularProgress />
            ) : (
              <List sx={{ width: "130%" }}>
                {filteredQuestions.map((q) => (
                  <ListItem key={q.id} sx={{ padding: 0 }}>
                    <Paper
                      elevation={2}
                      sx={{
                        width: "100%",
                        padding: 2,
                        margin: 1,
                        display: "flex",
                        alignItems: "flex-start",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Box
                        sx={{
                          borderLeft: "4px solid #007BFF",
                          paddingLeft: 1,
                          paddingTop: 1,
                          paddingBottom: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: "#007BFF", fontWeight: "bold" }}
                        >
                          #{q.id}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            fontFamily: "'Figtree', sans-serif",
                          }}
                        >
                          <div dangerouslySetInnerHTML={{ __html: q.title }} />
                        </Typography>
                      </Box>
                    </Paper>
                  </ListItem>
                ))}
              </List>
            )}
          </>
        )}
      </Container>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            marginBottom: 0,
            paddingBottom: 1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Create a new question
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 1, marginTop: 2 }}>
          <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
            Use the following space to create your own question
          </Typography>
          <ReactQuill
            value={question}
            onChange={setQuestion}
            style={{ height: "200px", marginBottom: "20px" }}
          />
          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateQuestion}
            sx={{ marginTop: 5, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Question"}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default CreateQuestionPage;