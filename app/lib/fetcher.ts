import authActions from "../auth/utils";
import { API_URL } from "../config";
import { isValidToken } from "./verifyToken";

const { getToken, handleJWTrefresh, storeToken } = authActions();

export const fetcher = async (url: string) => {
  const bearer: string = `Bearer ${getToken("access")}`;
  const headers: HeadersInit = url.startsWith("/auth")
    ? {
        Authorization: bearer,
        "Content-type": "application/json",
      }
    : {
        "Content-type": "application/json",
      }
  const settings: RequestInit = {
    method: "GET",
    headers: headers,
  };
  const urlLink: string = `${API_URL}${url}`;
  try {
    const res = await fetch(urlLink, settings);
    if (res.status === 401) {
      if (!isValidToken(getToken("refresh"))) {
        return;
      }
      const { access } = (await handleJWTrefresh()) as { access: string };
      storeToken(access, "access");
      const resWithRetry = await fetch(urlLink, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-type": "application/json",
        },
      });
      if (resWithRetry.status === 401) {
        return Promise.reject("Invalid Access and Refresh token!!!");
      }
      return resWithRetry.json();
    } else {
      return res.json();
    }
  } catch (e) {
    console.error(`First catch: ${e}`);
    throw e;
  }
};
