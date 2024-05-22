import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContainerProvider = ({ children }: { children: any }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default function useToast() {
  const sendWarn = (msg:string) => toast.warn(`${msg}`);
  const sendSuccess = (msg:string) => toast.success(`${msg}`);
  const sendInfo = (msg:string) => toast.info(`${msg}`);
  const sendError = (msg:string) => toast.error(`${msg}`);

  return {
    sendWarn,
    sendSuccess,
    sendInfo,
    sendError,
  };
}
