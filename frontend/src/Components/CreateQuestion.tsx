import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateQuestionPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#e0f7fa",
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

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
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
              No Questions Available
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Create a new question
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ marginBottom: 2 }}>
            Use the following space to create your own question
          </Typography>
          <ReactQuill
            value={question}
            onChange={setQuestion}
            style={{ height: "200px", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ marginTop: 5 }}
          >
            Create Question
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateQuestionPage;
