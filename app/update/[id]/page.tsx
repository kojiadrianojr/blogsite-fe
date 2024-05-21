"use client";

import PostFields from "@/app/foundations/PostFields.tsx";
import { PostFieldsModel } from "@/app/foundations/PostFields.tsx/index.model";
import Providers from "@/app/lib/Providers";
import useAuth from "@/app/lib/auth/AuthContextProvider";
import useData from "@/app/lib/data/DataContextProvider";
import { usePost } from "@/app/lib/hooks";
import { Container, Typography } from "@mui/material";
import React, { useMemo } from "react";

const Page = ({ params }: { params: any }) => {
  const { posts } = useData();
  const { currUser } = useAuth();
  const { editPost } = usePost();

  const handleAction = async (data: any) => {
    return editPost({ ...data, id: params.id });
  };

  const payload = useMemo(() => {
    const post = posts.find((p) => p.id === parseInt(params.id));
    return {
      title: post?.title,
      description: post?.description,
      owner: currUser?.id,
      action: handleAction,
    };
  }, [posts]);

  return (
    <Container maxWidth="sm" className="p-4">
      <Typography>Editting your post, {currUser?.username}!</Typography>
      <PostFields {...PostFieldsModel.getProps(payload)} />
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
