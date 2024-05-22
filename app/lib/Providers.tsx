import React from "react";
import { AuthContextProvider } from "./auth/AuthContextProvider";
import { DataContextProvider } from "./data/DataContextProvider";
import { ToastContainerProvider } from "../features/Toasts";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <ToastContainerProvider>
          {children}
        </ToastContainerProvider>
      </DataContextProvider>
    </AuthContextProvider>
  );
}
