"use client";

import React from "react";
import FormComponent from "@/app/foundations/forms";
import { FormModel } from "@/app/foundations/forms/index.model";
import { Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
import useAuth, {
  AuthContextProvider,
} from "@/app/lib/auth/AuthContextProvider";
import authActions from "../utils";

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
  const auth = useAuth();
  const { login, storeToken } = authActions();

  const handleAction = (payload: any) => {
    login(payload)
      .then((res) => {
        storeToken(res.access, "access");
        storeToken(res.refresh, "refresh");
        console.log("User successfully logged in...");
      })
      .catch((e) => {
        console.error({ status: e.status, msg: e.statusText });
      });
  };
  return (
    <Container
      className="flex items-center justify-center h-screen"
    >
      <Paper
        className="p-5"
        square
        sx={{
          width: {
            xs: "100%",
            sm: 500,
          },
        }}
      >
        <Typography variant="h5">Login Page</Typography>
        <Typography variant="body1">
          New user? &nbsp;
          <Link href="/auth/register" className="text-sky-400">
            Register here
          </Link>
        </Typography>
        <FormComponent
          {...FormModel.getProps({ fields: FIELDS, action: handleAction })}
        />
      </Paper>
    </Container>
  );
};

export default function RenderPage() {
  return (
    <AuthContextProvider>
      <LoginPage />
    </AuthContextProvider>
  );
}
