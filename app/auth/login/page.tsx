"use client";

import React, { useState } from "react";
import FormComponent from "@/app/foundations/forms";
import { FormModel } from "@/app/foundations/forms/index.model";
import { Container, IconButton, Paper, Typography } from "@mui/material";
import Link from "next/link";
import authActions from "../utils";
import { useRouter } from "next/navigation";
import LoginImage from "@/public/login.svg";
import NoSSR from "@/app/lib/NoSsr";
import useToast from "@/app/features/Toasts";
import Providers from "@/app/lib/Providers";
import Image from "next/image";
import useAuth from "@/app/lib/auth/AuthContextProvider";
import { ChevronLeftRounded } from "@mui/icons-material";
import { fetchAppMessage } from "@/app/lib/utils";
import { delays } from "@/app/config";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, storeToken } = authActions();
  const { handleIsLoggedIn } = useAuth();
  const { sendWarn, sendSuccess } = useToast();

  const handleAction = (payload: any) => {
    setIsLoading(true);
    login(payload)
      .then((res) => {
        storeToken(res.access, "access");
        storeToken(res.refresh, "refresh");
        handleIsLoggedIn(true);
        const msg = fetchAppMessage("Logged In", "success");
        sendSuccess(msg);
        setTimeout(() => {
          setIsLoading(false);
          router.push("/");
        }, delays.auth)
      })
      .catch((e) => {
        if (e.response.status === 401) {
          const msg = fetchAppMessage(e.info.detail, "warning");
          sendWarn(msg);
        }
        setTimeout(() => {
          setIsLoading(false)
        }, delays.auth);
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
          <IconButton onClick={() => router.push("/")} color="success">
            <ChevronLeftRounded />
          </IconButton>
          <Image
            width={500}
            height={500}
            src={LoginImage.src}
            alt="login image"
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
              isLoading,
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
    <Providers>
      <LoginPage />
    </Providers>
  );
}
