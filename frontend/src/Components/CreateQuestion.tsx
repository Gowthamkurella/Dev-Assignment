import { Box, Container } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import Body from "./Body";
import Navbar from "./Navbar";

const CreateQuestionPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E0F7FA",
        paddingTop: "64px",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "64px",
        }}
      >
        <Body />
      </Container>
    </Box>
  );
};
export default CreateQuestionPage;
