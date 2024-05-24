import Cookies from "js-cookie";
import { API_URL } from "../config";

/**
 * Store a token in cookies
 * @param {string} token - Stored token
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */

const storeToken = (token: string, type: "access" | "refresh"): void => {
  Cookies.set(type + "Token", token);
};

/**
 * Retrieve token
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 * @returns {string | undefined} state of the token
 */

const getToken = (type: string): any => {
  return Cookies.get(type + "Token");
};

/**
 * Remove access and refresh token
 */

const removeTokens = (): void => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const handleJWTrefresh = async() => {
  const refreshToken = getToken("refresh");
  const url = `${API_URL}/auth/jwt/refresh`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    })
    return res.json();
  } catch(e) {
    console.error(e);
  }
}

/**
 * Function for user authentication
 */

const register = async (payload: {
  email: string;
  username: string;
  password: string;
}) => {
  const url = `${API_URL}/auth/users/`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return {
        result: await res.json(),
        status: res.status,
        ok: res.ok,
      };
    }

    return {
      result: await res.json(),
      status: res.status,
      ok: res.ok,
    };
  } catch (e) {
    console.error(e);
  }
};

const login = async (payload: { username: string; password: string }) => {
  const url = `${API_URL}/auth/jwt/create/`;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    }
    const details = {
      response: res,
      info: await (res.json())
    }
    return Promise.reject(details);
  } catch (e) {
    console.error(e);
  }
};

const logout = async () => {
  const refreshToken = getToken("refresh");
  const url = `${API_URL}/auth/logout/`;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({refresh: refreshToken}),
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (e) {
    console.error(e);
  }
}

export default function authActions() {
  return {
    storeToken,
    getToken,
    removeTokens,
    handleJWTrefresh,
    register,
    login,
    logout,
  };
}
