"use client";

import { Container, Box, Typography, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { AuthContextProvider } from "./lib/auth/AuthContextProvider";
import { DataContextProvider } from "./lib/data/DataContextProvider";
import Loader from "./foundations/Loader";
import Filters from "./features/Filters";

const Appbar = dynamic(() => import("@/app/foundations/Appbar"));
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
    <AuthContextProvider>
      <DataContextProvider>
        <Home />
      </DataContextProvider>
    </AuthContextProvider>
  );
}
