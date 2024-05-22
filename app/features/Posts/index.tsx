import React, { useMemo } from "react";
import Post from "@/app/foundations/Post";
import { Box, Grid, Typography } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import { PostModel } from "@/app/foundations/Post/index.model";
import { PostProps } from "@/app/lib/data/DataContextProvider";
import { Props as LatestPostProps } from "@/app/foundations/Post/index.d";
import { compareDates, truncateText } from "@/app/lib/utils";
import useData from "@/app/lib/data/DataContextProvider";

const Posts = () => {
  const { posts } = useData();
  const latest = useMemo(() => {
    if (!posts) return;
    return posts.sort(compareDates)[posts.length - 1];
  }, [posts]);

  const restPosts = useMemo(
    () => posts.filter((p) => p !== latest),
    [posts]
  );
  return (
    <>
      {latest && (
        <Box
          mb={4}
          sx={{
            minHeight: {
              xs: "30vh",
              md: "auto",
            },
          }}
        >
          <Post {...PostModel.getProps({...latest, description: truncateText(latest.description, 50)})} isNew />
        </Box>
      )}
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 1,
        }}
      >
        {restPosts?.map((p: PostProps) => {
          const modifiedDescription = truncateText(p.description, 30);
          return (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <Post {...PostModel.getProps({...p, description: modifiedDescription})} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Posts;
