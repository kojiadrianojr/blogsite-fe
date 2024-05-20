import React from "react";
import { Typography, Button, Box } from "@mui/material";

interface Props extends React.ComponentProps<"div"> {}

const Component = (props: Props) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white",
        textAlign: "center",
        padding: 2
      }}
    > 
      <Typography variant="h3" fontWeight='bold' gutterBottom>
        PAPERS
      </Typography>
    </Box>
  );
};

export default Component;
