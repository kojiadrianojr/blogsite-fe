import React, { useMemo } from "react";
import Post from "@/app/foundations/Post";
import { Box, Grid, Typography } from "@mui/material";
import { PostModel } from "@/app/foundations/Post/index.model";
import { PostProps } from "@/app/lib/data/DataContextProvider";
import { compareDates, truncateText } from "@/app/lib/utils";
import useData from "@/app/lib/data/DataContextProvider";
import Image from "next/image";
import ArticleImage from "@/public/articles.svg";

const Posts = () => {
  const { posts, loading } = useData();
  const latest = useMemo(() => {
    return posts.sort(compareDates)[posts.length - 1];
  }, [posts]);

  const restPosts = useMemo(
    () => posts.filter((p) => p !== latest),
    [posts, latest]
  );

  if (!latest) {
    return (
      <Grid container alignItems="center" justifyContent="center" mt={10}>
        <Grid item xs={12}>
          <Typography className="text-center" variant="h4" fontWeight='400' fontFamily="monospace" gutterBottom>
            Create the first post, join now...
          </Typography>
        </Grid>
        <Grid item>
          <Image
            alt="Article image"
            src={ArticleImage.src}
            width={500}
            height={500}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      {!loading && latest && (
        <Box mb={4}>
          <Post
            {...PostModel.getProps({
              ...latest,
              description: truncateText(latest.description, 50),
            })}
            isNew
            raised={true}
          />
        </Box>
      )}

      <Grid
        container
        spacing={{
          xs: 2,
          sm: 3,
        }}
      >
        {restPosts?.map((p: PostProps) => {
          const modifiedDescription = truncateText(p.description, 30);
          return (
            <Grid key={p.id} item xs={12} sm={6}>
              <Post
                {...PostModel.getProps({
                  ...p,
                  description: modifiedDescription,
                })}
                variant="elevation"
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Posts;
