"use client";

import React, { useState } from "react";
import FormComponent from "@/app/foundations/forms";
import { FormModel } from "@/app/foundations/forms/index.model";
import { Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
import authActions from "../utils";
import { useRouter } from "next/navigation";
import RegisterImage from "@/public/register.svg";
import NoSSR from "@/app/lib/NoSsr";
import useToast from "@/app/features/Toasts";
import Providers from "@/app/lib/Providers";
import Image from "next/image";
import { handleErrors } from "@/app/lib/utils";

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
    fieldName: "email",
    required: true,
    type: "text",
  },
  {
    fieldName: "password",
    required: true,
    type: "password",
  },
];

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sendWarn, sendSuccess } = useToast();
  const router = useRouter();
  const { register } = authActions();
  const handleAction = (payload: any) => {
    setIsLoading(true);
    register(payload)
      .then((res) => {
        if (!res?.ok) {
          const msg = `${handleErrors(res?.result)}`;
          sendWarn(msg);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
          return;
        }
        const msg = `User account: ${payload.username} created!`;
        sendSuccess(msg);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        router.push("/auth/login");
      })
      .catch((e) => {
        console.error(e);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
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
          <Image
            width={500}
            height={500}
            src={RegisterImage.src}
            alt="login image"
            className="pb-4"
          />
          <Typography variant="h5">Registration Page</Typography>
          <Typography variant="body1">
            Already a member? &nbsp;
            <Link href="/auth/login" className="text-sky-400">
              Login here
            </Link>
          </Typography>
          <FormComponent
            {...FormModel.getProps({
              type: "Register",
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
      <RegisterPage />
    </Providers>
  );
}
