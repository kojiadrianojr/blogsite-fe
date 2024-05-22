
import { Props } from "./index.d";
import moment from "moment";

export class PostModel {
  static getProps(props: Props): Props {
    const { id, owner, title, description, isNew, created, variant, raised} = props;
    const modifiedDate = created ? moment(created).calendar() : '';
    return {
      id,
      owner,
      title,
      description,
      isNew,
      created: modifiedDate,
      variant,
      raised,
    };
  }
}
