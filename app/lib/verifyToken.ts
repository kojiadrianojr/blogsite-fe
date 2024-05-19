import jwt from "jsonwebtoken";
import authActions from "../auth/utils";

// Decode and validate access token
export const isValidToken = (token: any) => {
  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken || !decodedToken.exp) {
      return false; // Token is invalid
    }
    // Check if the token is expired
    return Date.now() < decodedToken.exp * 1000;
  } catch (error) {
    return false; // Error decoding token
  }
};


