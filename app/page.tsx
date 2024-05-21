"use client";

import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import Loader from "./foundations/Loader";
import Filters from "./features/Filters";
import Providers from "./lib/Providers";

const Appbar = dynamic(() => import("@/app/features/Appbar"));
const Posts = dynamic(() => import("./features/Posts"), {
  loading: Loader,
});

export function Home() {
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
