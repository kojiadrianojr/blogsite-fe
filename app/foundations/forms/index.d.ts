export type Field = {
  fieldName: string;
  required: boolean;
  type: string;
}
export type Props = {
  type?: string,
  isLoading?: boolean,
  fields: Field[]
  action: any;
}