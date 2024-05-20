"use client";

import { Chip, Container, Divider } from "@mui/material";
import dynamic from "next/dynamic";


const Appbar = dynamic(() => import("@/app/foundations/Appbar"), {
  ssr: false,
})

export default function Home() {
  return (
    <Container fixed disableGutters>
      <Appbar />
    </Container>
  );
}
