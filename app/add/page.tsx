"use client";

import { CloseRounded, SendRounded } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import useAuth, { AuthContextProvider } from "../lib/auth/AuthContextProvider";
import { usePost } from "../lib/hooks";

type PostProps = {
  title: string
  description: string
  owner: string
}

const Page = () => {
  const { currUser } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { sendPost } = usePost();

  const handleChange = useCallback((e:any) =>  setTitle(e),[])
  console.log('page reload')
  const router = useRouter();
  const handlePost = () => {
    const payload: PostProps = {
      title,
      description,
      owner: currUser.id,
    }
    sendPost(payload)
    .then((res:any) => console.log(res))
    .catch(e => console.error(e));
  }
  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Container maxWidth="sm" className="p-4">
      <Typography variant="h5" gutterBottom>
        What's on your mind?
      </Typography>
      <Box m="16px">
        <TextField onChange={(e) => handleChange(e.target.value)} label="Add a title" variant="standard" fullWidth />
      </Box>
      <Box m="8px">
        <TextField
          label="Write your story"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <ButtonGroup
        sx={{ mt: "16px" }}
        variant="contained"
        className="text-right"
      >
        <Button onClick={handleCancel} startIcon={<CloseRounded />} color="warning">
          Cancel
        </Button>
        <Button onClick={handlePost} endIcon={<SendRounded />}>Post</Button>
      </ButtonGroup>
    </Container>
  );
};

export default function Renderpage() {
  return (
    <AuthContextProvider>
      <Page />
    </AuthContextProvider>
  )
};
