export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const protectedRoutes = ["/add", "/update/"];
export const authRoutes = ["/auth/login", "/auth/register"];
export const delays = {
  auth: 1000,
  post: 2000,
};

export type NotificationMessageType =
  | "error"
  | "success"
  | "warning"
  | "info"
  | "confirmation"
  | "delete"
  | "created"
  | "update"
  | "cancel"
  | "ok"

export const notificationMessages: {[key in NotificationMessageType]:string} = {
  error: "An error occurred",
  ok: "Operation successful",
  info: "Informing you -",
  success: "Operation successful",
  warning: "Be advised",
  confirmation: "Are you sure - ",
  delete: "was deleted!",
  created: "was posted!",
  update: "was updated!",
  cancel: "Operation canceled!",
}
