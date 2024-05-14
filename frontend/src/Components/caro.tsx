import { Box } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SimpleCarousel: React.FC<{ images: string[]; customTexts: string[] }> = ({
  images,
  customTexts,
}) => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap');
        `}
        a
      </style>
      <Box
        sx={{
          maxWidth: "600px",
          height: "600px",
          overflow: "hidden",
          marginLeft: 9,
          position: "relative",
        }}
      >
        <Carousel showThumbs={false} showStatus={false}>
          {images.map((image, index) => (
            <Box key={index} style={{ position: "relative" }}>
              <img
                src={process.env.PUBLIC_URL + image}
                style={{ borderRadius: "10px" }}
                alt={`Slide ${index + 1}`}
              />
              <Box
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  textAlign: "left",
                  color: "white",
                  fontSize: "65px",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                  fontFamily: "'Figtree', sans-serif",
                }}
                sx={{ marginBottom: 5 }}
              >
                {customTexts[index]}
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default SimpleCarousel;
