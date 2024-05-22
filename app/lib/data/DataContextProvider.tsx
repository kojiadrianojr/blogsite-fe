import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export type PostProps = {
  id: number;
  owner: string;
  title: string;
  description: string;
  created: string;
};

type DataContextProps = {
  posts: PostProps[];
  setPosts: Function;
};

const initialState: DataContextProps = {
  posts: [
    {
      id: 0,
      owner: "",
      title: "",
      description: "",
      created: "",
    },
  ],
  setPosts: () => null,
};
export const DataContext = createContext(initialState);
export const DataContextProvider = ({ children }: { children: any }) => {
  const { data } = useSWR("/api/blog", fetcher);
  const [posts, setPosts] = useState<PostProps[]>(initialState.posts);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ posts, setPosts }}>
      {children}
    </DataContext.Provider>
  );
};

export default function useData() {
  return useContext(DataContext);
}
