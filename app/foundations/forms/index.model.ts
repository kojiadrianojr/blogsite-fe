import { Props } from './index.d';

export class FormModel {
  static getProps(props: Props): Props {
    const { fields, action, type } = props;
    return {
      fields,
      action,
      type,
    }
  }
}