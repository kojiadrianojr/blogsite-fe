import { fetcher } from "@/app/lib/fetcher";
import moment from "moment";
import useSWR from "swr";

export type Props = {
  title: string;
  description: string;
  owner: string;
  created: string;
}

export class PageModel {
  static getProps(props:Props): Props {
    const { title, description, owner, created } = props;
    const { data: author } = useSWR(`/auth/users/${owner}`, fetcher);
    const modifiedDate = moment(created).calendar();
    return {
      title,
      description,
      owner:author?.username,
      created: modifiedDate,
    }
  }
}