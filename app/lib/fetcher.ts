import authActions from "../auth/utils";
import { API_URL } from "../config";
import { isValidToken } from "./verifyToken";

const { handleJWTrefresh, storeToken, getToken } = authActions();
export const fetcher = (url: string) => {
  const urlLink: string = `${API_URL}${url}`;
  const bearer: string = `Bearer ${getToken("access")}`;

  // Check for refresh token;
  if (isValidToken(getToken('refresh')) === false) {
    return Promise.reject('No Refresh token found');
  }
  
  return fetch(urlLink, {
    method: "GET",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    }
  })
  .then(async (res) => {
    if (res.status === 401) {
      const { access } = (await handleJWTrefresh()) as { access: string };
      storeToken(access, "access");
      return fetch(url, {
        headers: {
          Authorization: `Bearer ${access}`,
        }
      }).then((res) => {
        if (res.status === 401) {
          window.location.replace('/auth/login');
        } else {
          return res.json();
        }
      }).catch(e => window.location.replace('/auth/login'));
    } else {
      return res.json();
    }
  })
  .catch(e => window.location.replace('/auth/login'));

};
