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
  loading: boolean
  posts: PostProps[];
  setPosts: Function;
};

const initialState: DataContextProps = {
  loading: true,
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
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostProps[]>(initialState.posts);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setPosts(data);
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ posts, setPosts, loading}}>
      {children}
    </DataContext.Provider>
  );
};

export default function useData() {
  return useContext(DataContext);
}
