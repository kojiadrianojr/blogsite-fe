"use client";

import Providers from "@/app/lib/Providers";
import useData from "@/app/lib/data/DataContextProvider";
import {
  ChevronLeftRounded,
  DeleteRounded,
  EditRounded,
  FullscreenExitRounded,
  FullscreenRounded,
  SaveRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PageModel } from "./index.model";
import { useRouter } from "next/navigation";
import useAuth from "@/app/lib/auth/AuthContextProvider";
import { ViewSkeleton } from "@/app/features/Skeleton";
import Field from "@/app/foundations/PostFields/atoms/Field";
import { usePost } from "@/app/lib/hooks";
import useToast from "@/app/features/Toasts";
import useDialog from "@/app/lib/dialog/DialogContextProvider";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import { isImage, validateFields } from "@/app/lib/utils";
import { delays, notificationMessages } from "@/app/config";

const Page = ({ params }: { params: any }) => {
  const { sendError, sendSuccess, sendInfo } = useToast();
  const [expandImage, setExpandImage] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [fieldStates, setFieldStates] = useState<{
    title?: string;
    description?: string;
    imageUrl?: string;
    validation: any;
  }>({
    title: "",
    imageUrl: "",
    description: "",
    validation: null,
  });
  const router = useRouter();
  const { loading, setPosts } = useData();
  const { currUser, isLoggedIn } = useAuth();
  const { editPost, deletePost } = usePost();
  const { data: post } = useSWR(`/api/blog/${params.id}`, fetcher);

  const data = {
    title: post?.title,
    description: post?.description,
    imageUrl: post?.imageUrl,
    owner: post?.owner,
    created: post?.created,
  };
  const { title, description, owner, created, imageUrl } =
    PageModel.getProps(data);

  const { getConfirmation } = useDialog();
  useEffect(() => {
    if (post) {
      setFieldStates({...fieldStates, title, imageUrl, description });
    }
  }, [post, description, title, imageUrl]);

  if (loading) {
    return <ViewSkeleton />;
  }
  const handleEdit = () => {
    setEdit(!edit);
    setFieldStates({...fieldStates, title, imageUrl, description });
  };

  const handleDelete = async () => {
    const userResponse = await getConfirmation(
      `Are you sure you want to delete [title: ${title}] ?`
    );
    if (userResponse) {
      setPosts((items: any) =>
        items.filter((item: any) => item.id !== params.id)
      );
      deletePost(params.id).then(() => {
        sendSuccess(`Post [title: ${title}] was deleted!`);
        setTimeout(() => router.back(), delays.post);
      });
    } else {
      sendInfo("Operation canceled");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldStates({ ...fieldStates, [`${e.target.name}`]: e.target.value });
  };

  const handleSave = () => {
    const { title, description, imageUrl } = fieldStates;
    editPost({
      title: title ?? "",
      description: description ?? "",
      imageUrl: imageUrl ?? "",
      id: params.id,
    })
      .then((res) => {
        if (!res?.response.ok) {
          setFieldStates({ ...fieldStates, validation: res?.info})
          return;
        }
        setFieldStates({ ...fieldStates, validation:null});
        sendSuccess(`[ ${fieldStates.title} ] ${notificationMessages.update}`);
        setEdit(false);
      })
      .catch((e) => sendError("Failed to edit your post, try again..."));
  }

  const authorized: boolean = currUser?.username === owner && isLoggedIn;
  return (
    <>
      <Container maxWidth="md" disableGutters>
        <Stack spacing={1} mt={4} mb={2} sx={{ p: { xs: 2 } }}>
          {edit ? (
            <Field
              label="Title"
              value={fieldStates.title ?? ""}
              name="title"
              onChange={handleOnChange}
              error={!!fieldStates.validation?.title}
              helperText={fieldStates.validation?.title}
            />
          ) : (
            <Typography variant="h5" gutterBottom className="underline">
              {fieldStates.title}
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
        {edit && (
          <Field
            label="Image url"
            name="imageUrl"
            value={fieldStates.imageUrl ?? ""}
            onChange={handleOnChange}
          />
        )}
        <Card
          raised
          sx={{
            m: {
              xs: 1,
            },
          }}
        >
          {fieldStates.imageUrl && (
            <Box
              sx={{
                backgroundImage: `url(${fieldStates.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: {
                  xs: expandImage ? 700 : 200,
                },
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title={!expandImage? "Maximize" : "Minimize"}>
              <IconButton
                onClick={() => setExpandImage(!expandImage)}
                color="info"
              >
                {expandImage ? (
                  <FullscreenExitRounded />
                ) : (
                  <FullscreenRounded />
                )}
              </IconButton>
              </Tooltip>
            </Box>
          )}
          <CardContent>
            {edit ? (
              <Field
                label="Description"
                value={fieldStates.description ?? ""}
                onChange={handleOnChange}
                multiline
                rows={4}
                variant="filled"
                error={!!fieldStates.validation?.description}
                helperText={fieldStates.validation?.description}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                {fieldStates.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
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
