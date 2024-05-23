import React, { useEffect, useState } from "react";
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
import Field from "./atoms/Field";

const PostFields = (props: Props) => {
  const { action, owner } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const { sendSuccess, sendInfo } = useToast();

  useEffect(() => {
    if (props.title && props.description && props.imageUrl) {
      setTitle(props.title);
      setDescription(props.description);
      setImageUrl(props.imageUrl);
    }
    router.refresh();
  }, [props.title, props.description, props.imageUrl, router]);

  const handleCancel = () => {
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }

  const handleSend = () => {
    setIsLoading(true);
    action({
      owner,
      title,
      imageUrl,
      description,
    })
      .then((res: any) => {
        sendSuccess(`Posted successfully! Redirecting...`);
        setTimeout(() => {
          setIsLoading(false);
          router.push("/");
        }, 2000);
      })
      .catch((e: any) => {
        console.error(`handleSend`, e);
        sendInfo("Error found, please retry...");
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  };

  return (
    <div>
      <Box my="16px">
        <Field label="Title" onChange={handleTitleChange} value={title} />
      </Box>
      <Box my="8px">
        <Field
          value={imageUrl}
          label="Image url"
          onChange={handleImageUrlChange}
        />
      </Box>
      <Box my="8px">
        <Field
          label="Description"
          onChange={handleDescriptionChange}
          value={description}
          multiline
          rows={4}
        />
      </Box>
      <ButtonGroup sx={{ my: "16px" }} variant="contained" size="small">
        <Button
          onClick={handleCancel}
          startIcon={<CloseRounded />}
          color="warning"
        >
          Cancel
        </Button>
        {/* <Button startIcon={<BackspaceRounded />}>Clear</Button> */}
        <LoadingButton
          loadingPosition="end"
          loading={isLoading}
          onClick={handleSend}
          endIcon={<SendRounded />}
        >
          <span>Submit</span>
        </LoadingButton>
      </ButtonGroup>
    </div>
  );
};

export default PostFields;
