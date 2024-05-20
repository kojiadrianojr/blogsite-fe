import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box textAlign="center">
      <Typography variant="h3">Please wait...</Typography>
      <CircularProgress />
    </Box>
  );
}
