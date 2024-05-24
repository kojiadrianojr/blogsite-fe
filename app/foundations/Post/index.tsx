import { DeleteRounded, ModeEditRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Props } from "./index.d";
import useAuth from "@/app/lib/auth/AuthContextProvider";
import { usePost } from "@/app/lib/hooks";
import useData from "@/app/lib/data/DataContextProvider";
import { useRouter } from "next/navigation";
import useDialog from "@/app/lib/dialog/useDialog";
import useToast from "@/app/features/Toasts";
import Image from "next/image";
import { isImage } from "@/app/lib/utils";
import zIndex from "@mui/material/styles/zIndex";

const Component = (props: Props) => {
  const router = useRouter();
  const { currUser } = useAuth();
  const { deletePost } = usePost();
  const { setPosts } = useData();
  const { sendSuccess, sendInfo } = useToast();

  const { id, title, description, created, owner, isNew, imageUrl } = props;
  const [ConfirmationDialog, confirmDelete] = useDialog(
    "Are you sure?",
    `Are you sure you want to delete "${title}"`
  );

  const isCurrUser = owner === currUser?.username;
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
      sendInfo("Post deletion canceled!");
    }
  };
  const backgroundSettings = isNew && {
    position: "relative",
    zIndex: 0,
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      opacity: "0.8",
      zIndex: -1,
    },
  };

  const renderCardImage = async () => {
    const isImageUrl = await isImage(imageUrl);
    if (isImageUrl) {
      return (
        <CardMedia
          component="img"
          alt="card-media/image"
          src={imageUrl}
          sx={{
            flex: "1 1 50%",
            display: {
              xs: 'none',
              md: "flex",
            },
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          minHeight: {
            md: "250px",
          },
          maxHeight: {
           md: isNew? "auto":"300px",
          },
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          ...backgroundSettings,
        }}
        variant={props.variant}
        raised={props.raised}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{ flex: "3 0 60%", zIndex: 1, p: { xs: 0, md: 2 } }}
        >
          <CardHeader
            title={title}
            titleTypographyProps={{
              variant: isNew ? "h4" : "h5",
              color: "primary.main"
            }}
            subheader={owner}
          />
          <CardContent>
            <Typography color="text.secondary" variant="body2">
              {created}
            </Typography>
            <Typography variant={isNew ? "h5" : "body1"}>
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{mt: "auto"}}>
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
              <Button
                color="info"
                className="text-nowrap"
                onClick={handleContinueRead}
              >
                see more...
              </Button>
            </Box>
          </CardActions>
        </Box>
        {!isNew && renderCardImage()}
      </Card>
      {ConfirmationDialog()}
    </>
  );
};

export default Component;
