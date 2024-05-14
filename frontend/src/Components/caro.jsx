import { Box } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "https://via.placeholder.com/400x200?text=Image+1",
  "https://via.placeholder.com/400x200?text=Image+2",
  "https://via.placeholder.com/400x200?text=Image+3",
];

export default function SimpleCarousel() {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        height: "800px",
        overflow: "hidden",
      }}
    >
      <Carousel
        showThumbs={false}
        showStatus={false}
        emulateTouch
        swipeable
        dynamicHeight={false}
      >
        {images.map((image, index) => (
          <Box key={index} sx={{ height: "100%" }}>
            <img
              src={image}
              style={{
                borderRadius: "15px",
                objectFit: "cover",
              }}
              alt={`Slide ${index + 1}`}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
