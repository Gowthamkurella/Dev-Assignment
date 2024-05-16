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
import { Controller, useForm } from "react-hook-form";

function Feedback() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (formData) => {
    console.log(formData, "data");
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                width="100"
                image="feedback.jpg"
                alt="Placeholder"
                sx={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: -150,
                  left: -280,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Submit Your Feedback
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="subtitle1">
                  On a scale of 1 to 5, how satisfied are you with the
                  cleanliness of our facilities?
                </Typography>
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => <Rating {...field} />}
                />
                <Divider sx={{ marginTop: "5px" }} />
              </CardContent>
              <CardContent>
                <Typography variant="subtitle1">
                  On a scale of 1 to 5, how satisfied are you with the
                  cleanliness of How would you rate the quality of the product
                  you recently purchased? (1 star = Poor, 5 stars = Excellent)
                </Typography>
                <Controller
                  name="rating1"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => <Rating {...field} />}
                />
                <Divider sx={{ marginTop: "5px" }} />
              </CardContent>
              <CardContent>
                <Typography variant="subtitle1">
                  On a scale of 1 to 5, how satisfied are you with the
                  cleanliness of How would you rate the quality of the product
                  you recently purchased? (1 star = Poor, 5 stars = Excellent)
                </Typography>
                <Controller
                  name="rating2"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => <Rating {...field} />}
                />
                <Divider sx={{ marginTop: "5px" }} />
              </CardContent>

              <CardContent>
                <Typography variant="subtitle1">
                  On a scale of 1 to 5, how satisfied are you with the
                  cleanliness of How would you rate the quality of the product
                  you recently purchased? (1 star = Poor, 5 stars = Excellent)
                </Typography>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Controller
                    name="rating3"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => <Rating {...field} />}
                  />
                </Box>
                <Divider sx={{ marginTop: "5px" }} />
              </CardContent>

              <CardContent>
                <Button type="submit">Submit</Button>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </form>
    </>
  );
}

export default Feedback;
