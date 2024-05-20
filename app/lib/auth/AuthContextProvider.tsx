import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../fetcher";

type AuthContextProps = {
  currUser: any | null;
};

const initialState: AuthContextProps = {
  currUser: null,
};

export const AuthContext = createContext<AuthContextProps>(initialState);
export const AuthContextProvider = ({ children }: { children: any }) => {
  const { data: user } = useSWR('/auth/users/me', fetcher);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [currUser, setCurrUser] = useState<any|null>(null);

  useEffect(() => {
    if (user) {
      setCurrUser(user)
    } else {
      setCurrUser(null) // Clear current user data
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ currUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
