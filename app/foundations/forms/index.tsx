import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  fields: any;
  action: any;
  type?: string;
  isLoading?: boolean;
};

type FormData = {
  [key: string]: string;
};

const FormComponent = (props: Props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const { fields, action, isLoading } = props;
  const formType = props.type ?? "Submit";
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(action)}>
      {fields.map((field: any) => (
        <TextField
          key={field.fieldName}
          variant="standard"
          label={field.fieldName}
          type={field.type}
          required={field.required}
          className="mt-2"
          {...register(field.fieldName)}
        />
      ))}

      <LoadingButton
        loading={isLoading}
        type="submit"
        className="mt-4"
        variant="contained"
      >
        {formType}
      </LoadingButton>
    </form>
  );
};

export default FormComponent;
