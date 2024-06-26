import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

export const ToastContainerProvider = ({ children }: { children: any }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={1000}
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
