"use client";

import { Container, Typography } from "@mui/material";
import React from "react";
import useAuth from "../lib/auth/AuthContextProvider";
import { usePost } from "../lib/hooks";
import PostFields from "../foundations/PostFields";
import { PostFieldsModel } from "../foundations/PostFields/index.model";
import Providers from "../lib/Providers";

const Page = () => {
  const { currUser } = useAuth();
  const { sendPost } = usePost();
  return (
    <Container maxWidth="sm" className="p-4">
      <Typography variant="h5" gutterBottom>
        What&apos;s on your mind?
      </Typography>
      <PostFields
        {...PostFieldsModel.getProps({ action: sendPost, owner: currUser?.username })}
      />
    </Container>
  );
};

export default function Renderpage() {
  return (
    <Providers>
      <Page />
    </Providers>
  );
}
