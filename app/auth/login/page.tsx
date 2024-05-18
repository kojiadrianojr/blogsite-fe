"use client";

import React from "react";
import FormComponent from "@/app/foundations/forms";
import { FormModel } from "@/app/foundations/forms/index.model";
import { Container, Paper, Typography } from "@mui/material";
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
  const handleAction = (payload:any) => {
    console.log(payload);
  }
  return (
    <Container className="flex items-center justify-center h-screen" sx={{border: '1px solid red'}}>
    <Paper className="p-4" square sx={{
      width: {
        xs: '100%',
        sm: 500,
      },
      border: '1px solid red'
    }}>
      <Typography variant="h5">Login Page</Typography>
      <Typography variant="body1">
        New user? &nbsp;
        <Link href="/auth/register" className="text-sky-400">
          Register here
        </Link>
      </Typography>
      <FormComponent {...FormModel.getProps({ fields: FIELDS, action: handleAction})} />
    </Paper>
    </Container>
  );
};

export default LoginPage;
