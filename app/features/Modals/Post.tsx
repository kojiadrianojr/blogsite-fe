import { CloseRounded, SendRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

// Post modal
const ModalComponent = (props: Props) => {
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="sm"
      >
        <Typography variant="h5" gutterBottom>
          What's on your mind?
        </Typography>
        <Box m="16px">
          <TextField label="Add a title" variant="standard" fullWidth />
        </Box>
        <Box m="8px">
          <TextField
            label="Write your story"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
        </Box>
        <ButtonGroup sx={{ mt: "16px" }} variant="contained">
          <Button
            onClick={onClose}
            startIcon={<CloseRounded />}
            color="warning"
          >
            Cancel
          </Button>
          <Button endIcon={<SendRounded />}>Post</Button>
        </ButtonGroup>
      </Container>
    </Modal>
  );
};

export default ModalComponent;
