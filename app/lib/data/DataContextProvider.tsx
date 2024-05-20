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
  posts: PostProps[] | [];
};

const initialState: DataContextProps = {
  posts: [],
};
export const DataContext = createContext(initialState);
export const DataContextProvider = ({ children }: { children: any }) => {
  const { data } = useSWR("/api/blog", fetcher);
  const [posts, setPosts] = useState<PostProps[] | []>([]);

  useEffect(() => {
    if (!data) {
      return setPosts([]);
    }
    return setPosts(data);
  }, [data]);

  return (
    <DataContext.Provider value={{ posts }}>{children}</DataContext.Provider>
  );
};

export default function useData(){
  return useContext(DataContext);
}