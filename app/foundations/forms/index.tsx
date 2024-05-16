import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";

type Props = {
  fields: any
  action: any
}

type FormData = {
  [key:string]:string
}


const FormComponent = (props: Props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const { fields, action } = props;
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(action)}>
      {
        fields.map((field:any) => (
          <TextField
            key={field.fieldName}
            variant="standard"
            label={field.fieldName}
            type={field.type}
            required={field.required}
            className="mt-2"
            {...register(field.fieldName)}
          />
        ))
      }
    <Button type="submit" className="mt-4" variant="contained">
      Submit
    </Button>
    </form>
  )
}

export default FormComponent;