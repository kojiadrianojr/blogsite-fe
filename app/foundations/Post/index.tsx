import { DeleteRounded, ModeEditRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Props } from "./index.d";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import useAuth from "@/app/lib/auth/AuthContextProvider";

const Component = (props: Props) => {
  const { currUser } = useAuth();
  const isNew = props?.isNew;
  const { title, description, created, owner } = props;
  // Match the 'owner'Id from the 'users' list;
  const { data: author } = useSWR(`/auth/users/${owner}`, fetcher);
  const isCurrUser = author?.username  === currUser?.username;
  return (
    <Card sx={{ p: { xs: 0, md: 3 }, height: '100%'}} >
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: isNew ? "h4" : "h5",
        }}
        subheader={author?.username ?? owner}
      />
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {created}
        </Typography>
        <Typography variant={isNew ? "h5" : "body1"}>{description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!isNew && isCurrUser && (
          <Box className="w-full">
            <IconButton aria-label="edit post">
              <ModeEditRounded />
            </IconButton>
            <IconButton aria-label="delete post">
              <DeleteRounded />
            </IconButton>
          </Box>
        )}
        <Box className="text-right w-full">
          <Button className="text-nowrap">Continue reading</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Component;
