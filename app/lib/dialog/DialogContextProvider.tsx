import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { createContext, useContext, useRef, useState } from "react";

type DialogContextType = {
  [key: string]: any; // To update...
};

export const DialogContext = createContext<DialogContextType>(
  {} as DialogContextType
);

const DialogBox = ({
  promise,
  title,
  handleConfirm,
  handleCancel,
}: {
  promise: any;
  title: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}) => {
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

  return (
    <DialogContext.Provider
      value={{
        setPromise,
        messageRef,
      }}
    >
      <DialogBox
        title={messageRef.current}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        promise={promise}
      />
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
