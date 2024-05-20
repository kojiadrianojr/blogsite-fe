"use client";

import { Chip, Container, Divider } from "@mui/material";
import dynamic from "next/dynamic";
import Post from "@/app/foundations/Post";
import Posts from "./features/Posts";

const Appbar = dynamic(() => import("@/app/foundations/Appbar"));

export default function Home() {
  return (
    <Container fixed disableGutters>
      <Appbar />
      <Container maxWidth="xl" disableGutters sx={{mt: 2}}>
        <Posts />
      </Container>
    </Container>
  );
}
