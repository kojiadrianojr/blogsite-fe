import { createContext, useContext, useState } from "react";

type Props = {
  isAuth: boolean;
  token: string;
};

const initialState: Props = {
  isAuth: false,
  token: "",
};

export const AuthContext = createContext<Props>(initialState);
export const AuthContextProvider = ({ children }: { children: any }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  return (
    <AuthContext.Provider value={{ isAuth, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
