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
import React, { useEffect, useState } from "react";
import { PageModel } from "./index.model";
import { useRouter } from "next/navigation";
import useAuth from "@/app/lib/auth/AuthContextProvider";
import { ViewSkeleton } from "@/app/features/Skeleton";
import Field from "@/app/foundations/PostFields.tsx/atoms/Field";
import { usePost } from "@/app/lib/hooks";
import useToast from "@/app/features/Toasts";
import useDialog from "@/app/lib/dialog/useDialog";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

const Page = ({ params }: { params: any }) => {
  const { sendError, sendSuccess, sendInfo } = useToast();
  const [edit, setEdit] = useState<boolean>(false);
  const [stateTitle, setTitle] = useState<string>("");
  const [stateDescription, setDescription] = useState<string>("");
  const router = useRouter();
  const { loading, setPosts } = useData();
  const { currUser, isLoggedIn } = useAuth();
  const { editPost, deletePost } = usePost();
  const { data: post } = useSWR(`/api/blog/${params.id}`, fetcher);

  const data = {
    title: post?.title,
    description: post?.description,
    owner: post?.owner,
    created: post?.created,
  };
  const { title, description, owner, created } = PageModel.getProps(data);

  const [Dialog, confirm] = useDialog(
    "Are you sure?",
    `Are you sure you want to delete "${title}" ?`
  );
  useEffect(() => {
    if (post) {
      setDescription(description ?? "");
      setTitle(title ?? "");
    }
  }, [post, description, title]);

  if (loading) {
    return <ViewSkeleton />;
  }
  const handleEdit = () => {
    setTitle(title ?? "");
    setDescription(description ?? "");
    setEdit(!edit);
  };

  const handleDelete = async () => {
    const userResponse = await confirm();
    if (userResponse) {
      setPosts((items: any) =>
        items.filter((item: any) => item.id !== params.id)
      );
      deletePost(params.id).then(() => {
        sendSuccess("Post Delete!");
        setTimeout(() => router.back(), 1000);
      });
    } else {
      sendInfo("Operation canceled");
    }
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
  console.log(currUser)
  return (
    <>
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
              <IconButton onClick={handleDelete} color="warning">
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
      {Dialog()}
    </>
  );
};

export default function RenderPage({ params }: { params: any }) {
  return (
    <Providers>
      <Page params={params} />
    </Providers>
  );
}
