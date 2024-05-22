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
import useDialog from "@/app/lib/dialog/useDialog";
import useToast from "@/app/features/Toasts";

const Component = (props: Props) => {
  const router = useRouter();
  const { currUser } = useAuth();
  const { deletePost } = usePost();
  const { setPosts } = useData();
  const {sendSuccess, sendInfo} = useToast();

  const { id, title, description, created, owner, isNew } = props;
  const [ConfirmationDialog, confirmDelete] = useDialog(
    "Are you sure?",
    `Are you sure you want to delete "${title}"`
  );
  // Match the 'owner'Id from the 'users' list;
  const { data: author } = useSWR(`/auth/users/${owner}`, fetcher);
  const isCurrUser = author?.username === currUser?.username;
  const handleEdit = () => {
    router.push(`/update/${id}`);
  };
  const handleContinueRead = () => {
    router.push(`/view/${id}`);
  };
  const handleDelete = async () => {
    const userResponse = await confirmDelete();
    if (userResponse) {
      setPosts((items: any) => items.filter((item: any) => item.id !== id));
      deletePost(id).then((res) => sendSuccess("Post deleted!"));
    } else {
      sendInfo("Post deletion canceled!")
    }
  };

  return (
    <>
      <Card
        sx={{
          p: { xs: 0, md: 3 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        variant={props.variant}
        raised={props.raised}
      >
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
          <Typography variant={isNew ? "h5" : "body1"}>
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ marginTop: "auto" }}>
          {!isNew && isCurrUser && (
            <Box className="w-full">
              <IconButton
                color="warning"
                aria-label="delete post"
                onClick={handleDelete}
              >
                <DeleteRounded />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="edit post"
                onClick={handleEdit}
              >
                <ModeEditRounded />
              </IconButton>
            </Box>
          )}
          <Box className="text-right w-full">
            <Button className="text-nowrap" onClick={handleContinueRead}>
              Continue reading
            </Button>
          </Box>
        </CardActions>
      </Card>
      {ConfirmationDialog()}
    </>
  );
};

export default Component;
