export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const protectedRoutes = ["/add"];
export const authRoutes = ["/auth/login", "/auth/register"];
export const delayTimer = 2000


export type MessageType = "error" | "success" | "warning" | "info";

export const messages:{[key in MessageType]: string} = {
  error: "An error occurred",
  info: "Information message",
  success: "Operation successful",
  warning: "Be advised",
}