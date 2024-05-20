import { Props } from "./index.d";
import moment from "moment";

export class PostModel {
  static getProps(props: Props): Props {
    const { id, owner, title, description, isNew, dateCreated } = props;
    const modifiedDate = moment(dateCreated).calendar();
    return {
      id,
      owner,
      title,
      description,
      isNew,
      dateCreated: modifiedDate,
    };
  }
}
