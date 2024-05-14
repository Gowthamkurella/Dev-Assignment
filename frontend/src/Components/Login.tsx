import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SimpleCarousel from "./caro";

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <form>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "90%",
            maxWidth: "1350px",
          }}
        >
          <Box sx={{ flex: 1, marginTop: 15 }}>
            <SimpleCarousel
              images={["/imag1.png", "/imag2.png", "/imag3.png"]}
              customTexts={[
                "Create your own Questionnaire ",
                "View Responses",
                "Rating Analytics",
              ]}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginLeft: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginTop: 1,
                marginLeft: 20,
                width: "400px",
                fontWeight: "bold",
                height: "90px",
                fontFamily: "'Figtree', sans-serif",
                fontSize: "30px",
              }}
              onClick={() => {
                navigate("/createquestions");
              }}
              type="submit"
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      <style>
        {`
                  @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap');

          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-image: linear-gradient(28deg, rgba(9,15,71,1) 38%, rgba(92,4,53,1) 87%);
          }
        `}
      </style>
    </form>
  );
};

export default Login;
