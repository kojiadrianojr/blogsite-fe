"use client";

import React from "react";
import FormComponent from "@/app/foundations/forms";
import { FormModel } from "@/app/foundations/forms/index.model";
import { Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
import authActions from "../utils";
import { useRouter } from "next/navigation";
import LoginImage from "@/public/login.svg";
import NoSSR from "@/app/lib/NoSsr";
import useToast, { ToastContainerProvider } from "@/app/features/Toasts";

type Field = {
  fieldName: string;
  required: boolean;
  type: string;
};

const FIELDS: Field[] = [
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
  const { login, storeToken } = authActions();
  const router = useRouter();
  const { sendError, sendSuccess } = useToast();
  
  const handleAction = (payload: any) => {
    login(payload)
      .then((res) => {
        storeToken(res.access, "access");
        storeToken(res.refresh, "refresh");
        const msg = "Successfully Logged in!"
        sendSuccess(msg)
        // router.push("/");
      })
      .catch((e) => {
        console.error({ status: e.status, msg: e.statusText });
        if (e.status === 401) {
          const msg = "Check your credentials!"
          sendError(msg);
        }
      });
  };

  return (
    <Container className="flex items-center justify-center h-screen">
      <NoSSR>
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
          <img
            src={LoginImage.src}
            alt="login image"
            style={{ width: "100%", height: "auto" }}
            className="pb-4"
          />
          <Typography variant="h5">Sign in</Typography>
          <Typography variant="body1">
            Interested? &nbsp;
            <Link href="/auth/register" className="text-sky-400">
              Join here!
            </Link>
          </Typography>
          <FormComponent
            {...FormModel.getProps({
              type: "Login",
              fields: FIELDS,
              action: handleAction,
            })}
          />
        </Paper>
      </NoSSR>
    </Container>
  );
};

export default function RenderPage() {
  return (
    <ToastContainerProvider>
      <LoginPage />
    </ToastContainerProvider>
  );
}
