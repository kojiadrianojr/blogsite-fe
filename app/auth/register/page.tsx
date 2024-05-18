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
        <Typography variant="h5">Registration Page</Typography>
        <Typography variant="body1">
          Already have an account? &nbsp;
          <Link href="/auth/login" className="text-sky-400">
            Login here
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
      <RegisterPage />
    </AuthContextProvider>
  );
}