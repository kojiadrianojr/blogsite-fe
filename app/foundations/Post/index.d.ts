type ID = number;

export type PostProps = {
  id: ID;
  owner: string;
  title: string;
  description: string;
  dateCreated: string;
};

export interface Props extends PostProps {
  isNew?: boolean;
} 
