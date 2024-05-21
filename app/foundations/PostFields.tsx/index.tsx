import { useEffect, useState } from "react";
import {
  BackspaceRounded,
  CloseRounded,
  SendRounded,
} from "@mui/icons-material";
import { Box, ButtonGroup, Button, TextField } from "@mui/material";
import { Props } from "./index.d";
import { useRouter } from "next/navigation";
import useToast from "@/app/features/Toasts";
import { LoadingButton } from "@mui/lab";

const PostFields = (props: Props) => {
  const { action, owner } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { sendSuccess, sendInfo } = useToast();

  useEffect(() => {
    if (props.title && props.description) {
      setTitle(props.title);
      setDescription(props.description);
    }
    router.refresh();
  }, [props.title, props.description]);

  const handleCancel = () => {
    router.push("/");
  };

  const handleSend = () => {
    setIsLoading(true)
    action({
      owner,
      title,
      description,
    })
      .then((res: any) => {
        sendSuccess(`Posted successfully! Redirecting...`);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000)
        router.push("/");
      })
      .catch((e: any) => {
        console.error(`handleSend`, e);
        sendInfo('Error found, please retry...')
        setTimeout(() => {
          setIsLoading(false);
        }, 2000)
      });
  };

  return (
    <div>
      <Box my="16px">
        <TextField
          label="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Box>
      <Box my="8px">
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
      </Box>
      <ButtonGroup
        sx={{ my: "16px" }}
        variant="contained"
        size="small"
      >
        <Button
          onClick={handleCancel}
          startIcon={<CloseRounded />}
          color="warning"
        >
          Cancel
        </Button>
        <Button startIcon={<BackspaceRounded />}>Clear</Button>
        <LoadingButton loadingPosition="end" loading={isLoading} onClick={handleSend} endIcon={<SendRounded />}>
          <span>Submit</span>
        </LoadingButton>
      </ButtonGroup>
    </div>
  );
};

export default PostFields;
