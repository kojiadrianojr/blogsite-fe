"use client";

import { Container, Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { AuthContextProvider } from "./lib/auth/AuthContextProvider";
import { DataContextProvider } from "./lib/data/DataContextProvider";

const Appbar = dynamic(() => import("@/app/foundations/Appbar"));
const Posts = dynamic(() => import("./features/Posts"), {
  loading: () => (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  ),
});

export function Home() {
  return (
    <Container fixed disableGutters>
      <Appbar />
      <Container maxWidth="xl" disableGutters sx={{ mt: 2 }}>
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
