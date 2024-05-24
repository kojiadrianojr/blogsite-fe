import { Box, TextField, TextFieldProps, TextFieldVariants } from "@mui/material";
import React from "react";

interface Props extends Omit<TextFieldProps, "variant"> {
  label: string;
  value: string;
  variant?: TextFieldVariants
}

const Field = (props: Props) => {
  return (
    <TextField {...props} fullWidth />
  );
};

export default Field;
