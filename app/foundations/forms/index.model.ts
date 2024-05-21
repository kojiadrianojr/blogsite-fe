import { Props } from './index.d';

export class FormModel {
  static getProps(props: Props): Props {
    const { fields, action, type, isLoading } = props;
    return {
      fields,
      action,
      type,
      isLoading,
    }
  }
}