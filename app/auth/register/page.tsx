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
import { useRouter } from "next/navigation";
import RegisterImage from "@/public/register.svg";
import NoSSR from "@/app/NoSSR";

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
  const router = useRouter();
  const auth = useAuth();
  const { register } = authActions();
  const handleAction = (payload: any) => {
    register(payload)
      .then((res) => {
        if (!res?.ok) {
          console.log(res?.result);
          return;
        }
        console.log("Use account created!!!");
        router.push("/auth/login");
      })
      .catch((e) => {
        console.error(e);
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
            src={RegisterImage.src}
            alt="login image"
            style={{ width: "100%", height: "auto" }}
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
    <AuthContextProvider>
      <RegisterPage />
    </AuthContextProvider>
  );
}
