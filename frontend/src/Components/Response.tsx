import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Rating,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

function Response() {
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
          <Card sx={{ marginTop: "100px" }}>
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
                top: 50,
                left: -300,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  User Responses
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Average Rating:
                </Typography>
              </Stack>
            </Box>

            <CardContent>
              <Typography variant="subtitle1">
                On a scale of 1 to 5, how satisfied are you with the cleanliness
                of our facilities?
              </Typography>
              <Rating />
              <Divider sx={{ marginTop: "5px" }} />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default Response;
