import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { createContext, useContext, useRef, useState } from "react";

type DialogContextType = {
  [key: string]: any; // To update...
};

export const DialogContext = createContext<DialogContextType>(
  {} as DialogContextType
);

export const DialogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [promise, setPromise] = useState<any>(null);
  const messageRef = useRef<any>(null);
  const handleClose = () => {
    setPromise(null);
  };
  const handleConfirm = () => {
    handleClose();
    promise?.resolve(true);
  };
  const handleCancel = () => {
    handleClose();
    promise?.resolve(false);
  };

  const DialogBox = (title: string) => {
    return (
      <Dialog open={promise !== null} fullWidth>
        <DialogContent>{title}</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Yes</Button>
          <Button onClick={handleCancel}>No</Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <DialogContext.Provider
      value={{
        setPromise,
        messageRef,
      }}
    >
      {DialogBox(messageRef.current)}
      {children}
    </DialogContext.Provider>
  );
};

export default function useDialog() {
  const context = useContext(DialogContext);
  const { messageRef, setPromise } = context;
  const getConfirmation = (message: string) => {
    messageRef.current = message;
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };
  return { getConfirmation };
}
