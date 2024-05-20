import { DeleteRounded, ModeEditRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  isNew?: boolean;
};

const Component = (props: Props) => {
  const isNew = props?.isNew;
  return (
    <Card sx={{ p: { xs: 0, md: 3 } }}>
      <CardHeader
        title="Title "
        titleTypographyProps={
          isNew && {
            variant: "h3",
          }
        }
        subheader="name"
      />
      <CardContent>
        <Typography color="text.secondary" variant="body2">20/05/2024</Typography>
        <Typography variant={isNew ? "h5" : "body1"}>Description</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!isNew && (
          <Box className="w-full">
            <IconButton aria-label="edit post">
              <ModeEditRounded />
            </IconButton>
            <IconButton aria-label="delete post">
              <DeleteRounded />
            </IconButton>
          </Box>
        )}
        <Box className="text-right w-full">
          <Button className="text-nowrap">Continue reading</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Component;
