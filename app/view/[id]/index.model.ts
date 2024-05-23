import moment from "moment";

export type Props = {
  title?: string;
  description?: string;
  owner?: string;
  imageUrl: string;
  created?: string;
}

export class PageModel {
  static getProps(props:Props): Props {
    const { title, description, owner, created, imageUrl } = props;
    const modifiedDate = moment(created).calendar();
    return {
      title,
      imageUrl,
      description,
      owner:owner,
      created: modifiedDate,
    }
  }
}