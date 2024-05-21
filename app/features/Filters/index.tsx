import { PostAddRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Filters = () => {
  const router = useRouter();
  return (
    <Box my={2}>
      <Button
        onClick={() => router.push("/add")}
        variant="outlined"
        startIcon={<PostAddRounded />}
      >
        Write a post
      </Button>
    </Box>
  );
};

export default Filters;
