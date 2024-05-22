import { PostProps } from "@/app/lib/data/DataContextProvider";

export interface Props extends PostProps {
  isNew?: boolean;
  variant?: any;
  raised?: boolean;
} 
