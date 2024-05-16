import { Props } from './index.d';

export class FormModel {
  static getProps(props: Props) {
    const { fields } = props;
    return {
      fields,
    }
  }
}