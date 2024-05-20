export type Field = {
  fieldName: string;
  required: boolean;
  type: string;
}
export type Props = {
  type?: string,
  fields: Field[]
  action: any;
}