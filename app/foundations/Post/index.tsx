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
import { usePost } from "@/app/lib/hooks";
import useData from "@/app/lib/data/DataContextProvider";
import { useRouter } from "next/navigation";

const Component = (props: Props) => {
  const router = useRouter();
  const { currUser } = useAuth();
  const { deletePost } = usePost();
  const { setPosts } = useData();
  const { id, title, description, created, owner, isNew } = props;
  // Match the 'owner'Id from the 'users' list;
  const { data: author } = useSWR(`/auth/users/${owner}`, fetcher);
  const isCurrUser = author?.username === currUser?.username;

  const handleEdit = () => {
    router.push(`/update/${id}`)
  }
  const handleDelete = () => {
    setPosts((items: any) => items.filter((item: any) => item.id !== id));
    deletePost(id).then((res) => console.log(res));
  };

  return (
    <Card sx={{ p: { xs: 0, md: 3}, height: "100%", display: 'flex', flexDirection: 'column'}}>
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
      <CardActions disableSpacing sx={{marginTop: 'auto'}}>
        {!isNew && isCurrUser && (
          <Box className="w-full">
            <IconButton aria-label="edit post" onClick={handleEdit}>
              <ModeEditRounded />
            </IconButton>
            <IconButton aria-label="delete post" onClick={handleDelete}>
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
