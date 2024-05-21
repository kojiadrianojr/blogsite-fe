import { useEffect, useState } from "react";
import { CloseRounded, SendRounded } from "@mui/icons-material";
import { Box, ButtonGroup, Button, TextField } from "@mui/material";
import { Props } from "./index.d";
import { useRouter } from "next/navigation";

const PostFields = (props: Props) => {
  const { action, owner } = props;
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
    action({
      owner,
      title,
      description,
    })
      .then((res: any) => console.log(res))
      .catch((e: any) => console.error(e));
  };

  return (
    <div>
      <Box my="16px">
        <TextField
          label="title"
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
          label="description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
      </Box>
      <ButtonGroup
        sx={{ mt: "16px" }}
        variant="contained"
        className="text-right"
      >
        <Button
          onClick={handleCancel}
          startIcon={<CloseRounded />}
          color="warning"
        >
          Cancel
        </Button>
        <Button onClick={handleSend} endIcon={<SendRounded />}>
          Post
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PostFields;
