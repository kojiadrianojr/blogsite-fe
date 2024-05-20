import React from "react";
import Post from "@/app/foundations/Post";
import { Box, Grid, Typography } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import { PostModel } from "@/app/foundations/Post/index.model";
import { PostProps } from "@/app/foundations/Post/index.d";

const RenderNewPost = (props: PostProps) => {
  return (
    <Box mb={4}>
      <Post {...PostModel.getProps(props)} />
    </Box>
  );
};

const Posts = () => {
  const { data: posts } = useSWR("/api/blog", fetcher);

  return (
    <>
      {/* <RenderNewPost /> */}
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 1,
        }}
      >
        {posts?.map((p: PostProps) => {
          return (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <Post {...PostModel.getProps(p)} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Posts;
