"use client";

import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import Loader from "./foundations/Loader";
import Providers from "./lib/Providers";
import MainSkeleton, { AppBarSkeleton, FiltersSkeleton, PostsSkeleton } from "./features/Skeleton/"
import { useEffect, useState } from "react";

const Appbar = dynamic(() => import("@/app/features/Appbar"), {
  loading: AppBarSkeleton,
});
const Filters = dynamic(() => import("./features/Filters"), {
  loading: FiltersSkeleton
});
const Posts = dynamic(() => import("./features/Posts"), {
  loading: PostsSkeleton 
});

export function Home() {
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(true);
    }, 2000);
  }, [])

  if (!initialLoad) {
    return (
      <Container fixed disableGutters>
        <MainSkeleton />
      </Container>
    )
  }

  return (
    <Container fixed disableGutters>
      <Appbar />
      <Container maxWidth="xl" disableGutters sx={{ mt: 2 }}>
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
