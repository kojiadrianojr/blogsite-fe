import { Props } from "./index.d";

export class PostFieldsModel {
  static getProps(props: Props): Props {
    const { action, title, description, owner, imageUrl } = props;

    if (!title && !description && !imageUrl) {
      return {
        action,
        owner,
      };
    }

    return {
      action,
      title,
      imageUrl,
      description,
      owner,
    };
  }
}
