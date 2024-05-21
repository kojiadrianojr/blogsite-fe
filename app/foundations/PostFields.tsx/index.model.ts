import { Props } from "./index.d";

export class PostFieldsModel {
  static getProps(props: Props): Props {
    const { action, title, description, owner } = props;

    if (!title && !description) {
      return {
        action,
        owner,
      };
    }

    return {
      action,
      title,
      description,
      owner,
    };
  }
}
