import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

interface Question {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const Body = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [query, setQuery] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );
  const [hoveredQuestionId, setHoveredQuestionId] = useState<string | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  const fetchQuestions = async () => {
    const response = await axios.get("http://localhost:3000/questions");
    return response.data;
  };

  const fetchSearchResults = async (searchTerm: string) => {
    if (!searchTerm) {
      queryClient.invalidateQueries("questions");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/questions?q=${searchTerm}`
      );
      queryClient.setQueryData("questions", response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchSearchResults = useCallback(
    debounce(fetchSearchResults, 300),
    []
  );

  useEffect(() => {
    debouncedFetchSearchResults(query);
    // Cleanup debounce on unmount
    return () => debouncedFetchSearchResults.cancel();
  }, [query, debouncedFetchSearchResults]);
  const createQuestion = async (newQuestion: { title: string }) => {
    const response = await axios.post(
      "http://localhost:3000/questions",
      newQuestion
    );
    return response.data;
  };

  const updateQuestion = async ({
    id,
    updatedQuestion,
  }: {
    id: string;
    updatedQuestion: { title: string };
  }) => {
    const response = await axios.put(
      `http://localhost:3000/questions/${id}`,
      updatedQuestion
    );
    return response.data;
  };

  const deleteQuestion = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:3000/questions/${id}`
    );
    return response.data;
  };

  const {
    data: questions,
    isLoading,
    error,
  } = useQuery<Question[], Error>("questions", fetchQuestions);

  const createMutation = useMutation(createQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  const updateMutation = useMutation(updateQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  const deleteMutation = useMutation(deleteQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  const handleClickOpen = () => {
    setEditingQuestionId(null);
    setQuestion("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuestion("");
    setEditingQuestionId(null);
  };

  const handleCreateOrUpdateQuestion = () => {
    const trimmedQuestion = question.trim();
    if (editingQuestionId) {
      updateMutation.mutate({
        id: editingQuestionId,
        updatedQuestion: { title: trimmedQuestion },
      });
    } else {
      createMutation.mutate({ title: trimmedQuestion });
    }
    handleClose();
  };

  const handleEditQuestion = (id: string, title: string) => {
    setEditingQuestionId(id);
    setQuestion(title.trim());
    setOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setQuestionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setQuestionToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      deleteMutation.mutate(questionToDelete);
    }
    handleDeleteCancel();
  };

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFC300",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          position: "sticky",
          top: "64px",
          backgroundColor: "#E0F7FA",
          zIndex: 1,
          paddingY: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexGrow: 1,
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
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              debouncedFetchSearchResults(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: 1,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginRight: "10px",
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
            View Feedback
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{(error as Error).message}</Typography>
      ) : questions?.length === 0 && query ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            height: "60vh",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginTop: "20px",
              fontFamily: "'Figtree', sans-serif",
            }}
          >
            No matches found
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
            Try adjusting your search criteria.
          </Typography>
        </Box>
      ) : questions?.length === 0 && !query ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            height: "60vh",
          }}
        >
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
            Click the "Create Question" button to add a new question.
          </Typography>
        </Box>
      ) : (
        questions && (
          <List sx={{ width: "100%" }}>
            {questions.map((q, index) => (
              <ListItem
                key={q._id}
                sx={{ padding: 0 }}
                onMouseEnter={() => setHoveredQuestionId(q._id)}
                onMouseLeave={() => setHoveredQuestionId(null)}
              >
                <Paper
                  elevation={2}
                  sx={{
                    padding: 2,
                    margin: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    width: "auto",
                    maxWidth: "100%",
                    flexGrow: 1,
                    borderLeft: `4px solid ${colors[index % colors.length]}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexGrow: 1,
                      paddingLeft: 1,
                      paddingTop: 1,
                      paddingBottom: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "blue", fontWeight: "bold" }}
                      >
                        #{q._id}
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
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditQuestion(q._id, q.title)}
                      sx={{
                        visibility:
                          hoveredQuestionId === q._id ? "visible" : "hidden",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteClick(q._id)}
                      sx={{
                        visibility:
                          hoveredQuestionId === q._id ? "visible" : "hidden",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </ListItem>
            ))}
          </List>
        )
      )}
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
              {editingQuestionId ? "Edit question" : "Create a new question"}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 2, paddingBottom: 1 }}>
          <Typography gutterBottom sx={{ marginTop: 2 }}>
            Use the following space to {editingQuestionId ? "edit" : "create"}{" "}
            your question
          </Typography>
          <ReactQuill
            value={question}
            onChange={(value) => setQuestion(value)}
            style={{ height: "200px", marginBottom: "20px" }}
          />
          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {(error as Error).message}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrUpdateQuestion}
            sx={{ marginTop: 5, fontWeight: "bold" }}
            disabled={isLoading}
          >
            {isLoading
              ? editingQuestionId
                ? "Updating..."
                : "Creating..."
              : editingQuestionId
              ? "Update Question"
              : "Create Question"}
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/deleteicon.png`}
            alt="deleteicon"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
            Delete Question
          </DialogTitle>
          <Typography>
            Once you confirm delete there will be no recovering of deleted
            question
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="primary"
            variant="contained"
          >
            Yes Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Body;
