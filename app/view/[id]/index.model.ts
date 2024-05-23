import moment from "moment";

export type Props = {
  title?: string;
  description?: string;
  owner?: string;
  created?: string;
}

export class PageModel {
  static getProps(props:Props): Props {
    const { title, description, owner, created } = props;
    const modifiedDate = moment(created).calendar();
    return {
      title,
      description,
      owner:owner,
      created: modifiedDate,
    }
  }
}