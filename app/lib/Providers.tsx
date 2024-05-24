import React from "react";
import { AuthContextProvider } from "./auth/AuthContextProvider";
import { DataContextProvider } from "./data/DataContextProvider";
import { ToastContainerProvider } from "../features/Toasts";
import { DialogContextProvider } from "./dialog/DialogContextProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <ToastContainerProvider>
          <DialogContextProvider>{children}</DialogContextProvider>
        </ToastContainerProvider>
      </DataContextProvider>
    </AuthContextProvider>
  );
}
