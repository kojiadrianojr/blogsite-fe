"use client";

import { Container, Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const Appbar = dynamic(() => import("@/app/foundations/Appbar"));
const Posts = dynamic(() => import("./features/Posts"), {
  loading: () => <Box><Typography>Loading...</Typography></Box>,
});

export default function Home() {
  return (
    <Container fixed disableGutters>
      <Appbar />
      <Container maxWidth="xl" disableGutters sx={{ mt: 2 }}>
        <Posts />
      </Container>
    </Container>
  );
}
