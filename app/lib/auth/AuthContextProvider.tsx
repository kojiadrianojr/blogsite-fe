import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import authActions from "@/app/auth/utils";

type AuthContextProps = {
  currUser: any | null;
  isLoggedIn: boolean;
  handleIsLoggedIn: Function;
};

const initialState: AuthContextProps = {
  currUser: null,
  isLoggedIn: false,
  handleIsLoggedIn: () => null,
};

export const AuthContext = createContext<AuthContextProps>(initialState);

const { getToken } = authActions();

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currUser, setCurrUser] = useState<any | null>(null);

  useEffect(() => {
    const status = getToken("refresh");
    if (status) {
      setIsLoggedIn(true);
    }
  }, []);

  const { data: user } = useSWR(isLoggedIn && "/auth/users/me", fetcher);
  const handleIsLoggedIn = (status: boolean) => {
    setIsLoggedIn(status);
  };

  useEffect(() => {
    if (user) {
      setCurrUser(user);
    } else {
      setCurrUser(null); // Clear current user data
    }
  }, [user]);

  return isLoggedIn ? (
    <AuthContext.Provider value={{ currUser, isLoggedIn, handleIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  ) : (
    <>{children}</>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
