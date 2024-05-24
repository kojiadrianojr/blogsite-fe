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
import { sendError } from "next/dist/server/api-utils";
import { validateFields } from "@/app/lib/utils";

const PostFields = (props: Props) => {
  const { action, owner } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldStates, setFieldState] = useState<{
    title: string;
    description: string;
    imageUrl: string;
    validation: any;
  }>({
    title: "",
    description: "",
    imageUrl: "",
    validation: null,
  });
  const { sendSuccess, sendInfo } = useToast();

  useEffect(() => {
    if (props.title && props.description && props.imageUrl) {
      setFieldState({
        ...fieldStates,
        title: props.title,
        description: props.description,
        imageUrl: props.imageUrl,
      });
    }
    router.refresh();
  }, [props.title, props.description, props.imageUrl, router]);

  const handleCancel = () => {
    router.back();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldState({ ...fieldStates, [`${e.target.name}`]: e.target.value });
  };

  const handleSend = () => {
    setIsLoading(true);
    const { title, imageUrl, description } = fieldStates;
    action({
      owner,
      title,
      imageUrl,
      description,
    })
      .then((res: any) => {
        if (!res.response.ok) {
          setFieldState({ ...fieldStates, validation: res.info });
          setIsLoading(false);
          return;
        }
        setFieldState({...fieldStates, validation: null});
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
        <Field
          label="Title"
          name="title"
          onChange={handleOnChange}
          value={fieldStates.title}
          error={!!fieldStates.validation?.title}
          helperText={fieldStates.validation?.title}
        />
      </Box>
      <Box my="8px">
        <Field
          name="imageUrl"
          value={fieldStates.imageUrl}
          label="Image url"
          onChange={handleOnChange}
        />
      </Box>
      <Box my="8px">
        <Field
          name="description"
          label="Description"
          onChange={handleOnChange}
          value={fieldStates.description}
          multiline
          rows={4}
          error={!!fieldStates.validation?.description}
          helperText={fieldStates.validation?.description}
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
