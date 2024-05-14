import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import SimpleCarousel from "./caro.jsx";

export default function Login() {
  return (
    <form>
      <>
        <Box
          sx={{
            height: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage:
              " linear-gradient(28deg, rgba(9,15,71,1) 38%, rgba(92,4,53,1) 87%);",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              marginTop: "30%",
              marginLeft: "10%",
              width: "100%",
              height: "100%",
            }}
          >
            <SimpleCarousel />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "61%",
              left: "50%",
              transform: "translate(80%, -90%)",
              padding: "20px",
              margin: 2,
              textAlign: "left",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              color="white"
              fontWeight="bold"
              fontFamily="figtree"
              sx={{ marginBottom: 7 }}
            >
              Login to your account
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", margin: 1 }}>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="white"
                  sx={{ margin: -1, marginLeft: 1 }}
                >
                  Login ID
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  defaultValue=""
                  fullWidth
                  sx={{
                    margin: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="white"
                  sx={{ margin: 1, marginTop: 2 }}
                >
                  Password
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  defaultValue=""
                  type="password"
                  fullWidth
                  sx={{
                    margin: -1,
                    marginLeft: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                display: "block",
                margin: "auto",
                width: "30%",
                fontWeight: "bold",
                marginTop: 5,
              }}
              type="submit"
            >
              Login
            </Button>
          </Box>
        </Box>
        <style>
          {`
          body {
            overflow: hidden;
          }
        `}
        </style>
      </>
    </form>
  );
}
