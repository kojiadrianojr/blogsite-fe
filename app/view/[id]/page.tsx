"use client";

import Providers from "@/app/lib/Providers";
import useData from "@/app/lib/data/DataContextProvider";
import {
  ChevronLeftRounded,
  DeleteRounded,
  EditRounded,
  SaveRounded,
} from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { PageModel, Props } from "./index.model";
import { useRouter } from "next/navigation";
import useAuth from "@/app/lib/auth/AuthContextProvider";
import { ViewSkeleton } from "@/app/features/Skeleton";
import Field from "@/app/foundations/PostFields.tsx/atoms/Field";
import { usePost } from "@/app/lib/hooks";
import useToast from "@/app/features/Toasts";

const Page = ({ params }: { params: any }) => {
  const { sendError, sendSuccess } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [stateTitle, setTitle] = useState<string>("");
  const [stateDescription, setDescription] = useState<string>("");
  const router = useRouter();
  const { posts } = useData();
  const { currUser } = useAuth();
  const { editPost } = usePost();

  const post: Props = useMemo(
    () => posts.find((p) => p.id === params.id) ?? posts[0],
    [posts]
  );

  const data = {
    title: post.title,
    created: post.created,
    description: post.description,
    owner: post.owner,
  };
  const { title, description, owner, created } = PageModel.getProps(data);

  useEffect(() => {
    if (posts) {
      setDescription(description ?? "");
      setTitle(title ?? "");
      setLoading(false);
    }
  }, [posts]);

  if (loading) {
    return <ViewSkeleton />;
  }
  const handleEdit = () => {
    setTitle(title ?? "");
    setDescription(description ?? "");
    setEdit(!edit);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    editPost({
      title: stateTitle,
      description: stateDescription,
      id: params.id,
    })
      .then((res) => {
        setTitle(res.title);
        setDescription(res.description);
        sendSuccess("Your post has been updated!");
        setEdit(false);
      })
      .catch((e) => sendError("Failed to edit your post, try again..."));
  };

  const authorized: boolean = currUser?.username === owner;

  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={1} mt={4} mb={2} sx={{ p: { xs: 2 } }}>
        {edit ? (
          <Field
            label="Title"
            value={stateTitle}
            onChange={handleTitleChange}
          />
        ) : (
          <Typography variant="h5" gutterBottom className="underline">
            {stateTitle}
          </Typography>
        )}

        <Typography variant="subtitle2" gutterBottom>
          {created} by {owner}
        </Typography>
      </Stack>

      <ButtonGroup
        sx={{ mb: 2, justifyContent: "space-between", width: "100%" }}
      >
        <Button
          color="info"
          variant="text"
          onClick={() => router.back()}
          startIcon={<ChevronLeftRounded />}
        >
          Back
        </Button>
        {authorized && (
          <div>
            <IconButton color="warning">
              <DeleteRounded />
            </IconButton>
            <IconButton onClick={handleEdit} color="secondary">
              <EditRounded />
            </IconButton>
            {edit && (
              <IconButton onClick={handleSave} color="success">
                <SaveRounded />
              </IconButton>
            )}
          </div>
        )}
      </ButtonGroup>
      <Paper
        sx={{
          p: {
            xs: 2,
            sm: 4,
          },
          m: {
            xs: 1,
          },
        }}
      >
        {edit ? (
          <Field
            label="Description"
            value={stateDescription}
            onChange={handleDescriptionChange}
            multiline
            rows={4}
            variant="filled"
          />
        ) : (
          <Typography variant="body1" gutterBottom>
            {stateDescription}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default function RenderPage({ params }: { params: any }) {
  return (
    <Providers>
      <Page params={params} />
    </Providers>
  );
}
