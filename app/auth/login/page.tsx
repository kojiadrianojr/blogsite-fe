import React from "react";
import FormComponent from "@/app/foundations/forms";
import { FormModel } from "@/app/foundations/forms/index.model";
import { Paper, Typography } from "@mui/material";
import Link from "next/link";

const FIELDS = [
  {
    fieldName: "username",
    required: true,
    type: "text",
  },
  {
    fieldName: "password",
    required: true,
    type: "password",
  },
];

const LoginPage = () => {
  return (
    <Paper className="p-4" square>
      <Typography variant="h5">Login Page</Typography>
      <Typography variant="body1">
        New user? &nbsp;
        <Link href="/auth/register" className="text-sky-400">
          Register here
        </Link>
      </Typography>
      <FormComponent {...FormModel.getProps({ fields: FIELDS })} />
    </Paper>
  );
};

export default LoginPage;
