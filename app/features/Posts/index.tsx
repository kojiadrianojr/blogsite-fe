import React, { useMemo } from "react";
import Post from "@/app/foundations/Post";
import { Box, Grid } from "@mui/material";
import { PostModel } from "@/app/foundations/Post/index.model";
import { PostProps } from "@/app/lib/data/DataContextProvider";
import { compareDates, truncateText } from "@/app/lib/utils";
import useData from "@/app/lib/data/DataContextProvider";

const Posts = () => {
  const { posts } = useData();
  const latest = useMemo(() => {
    return posts.sort(compareDates)[posts.length - 1];
  }, [posts]);

  const restPosts = useMemo(() => posts.filter((p) => p !== latest), [posts]);
  return (
    <>
      <Box
        mb={4}
        sx={{
          minHeight: {
            xs: "30vh",
            md: "auto",
          },
        }}
      >
        <Post
          {...PostModel.getProps({
            ...latest,
            description: truncateText(latest.description, 50),
          })}
          isNew
          raised={true}
        />
      </Box>

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
            <Grid key={p.id} item xs={12} sm={6} lg={4}>
              <Post
                {...PostModel.getProps({
                  ...p,
                  description: modifiedDescription,
                })}
                variant="outlined"
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Posts;
