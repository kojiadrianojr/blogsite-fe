"use client";

import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import Providers from "./lib/Providers";
import {
  AppBarSkeleton,
  FiltersSkeleton,
  PostsSkeleton,
} from "./features/Skeleton/";

const Appbar = dynamic(() => import("@/app/features/Appbar"), {
  loading: AppBarSkeleton,
});
const Filters = dynamic(() => import("./features/Filters"), {
  loading: FiltersSkeleton,
});
const Posts = dynamic(() => import("./features/Posts"), {
  loading: PostsSkeleton,
  ssr: true,
});

function Home() {

  return (
    <Container fixed disableGutters>
      <Appbar />
      <Container maxWidth="xl" disableGutters sx={{ mt: 2, p: 1}}>
        <Filters />
        <Posts />
      </Container>
    </Container>
  );
}

export default function RenderHome() {
  return (
    <Providers>
      <Home />
    </Providers>
  );
}
