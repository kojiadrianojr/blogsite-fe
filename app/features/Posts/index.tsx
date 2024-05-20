import React from "react";
import Post from "@/app/foundations/Post";
import { Box, Grid, Typography } from "@mui/material";

const RenderNewPost = () => {
  return (
    <Box mb={4}>
      <Post isNew />
    </Box>
  )
};

const Posts = () => {
  return (
    <>
      <RenderNewPost />
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 1,
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Post />
        </Grid>
      </Grid>
    </>
  );
};

export default Posts;
