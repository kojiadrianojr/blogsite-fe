import { Button, TextField } from "@mui/material";

type Props = {
  fields: any
}

const FormComponent = (props: Props) => {
  const { fields } = props;
  return (
    <form className="flex flex-col">
      {
        fields.map((field:any) => (
          <TextField
            key={field.fieldName}
            variant="standard"
            label={field.fieldName}
            type={field.type}
            required={field.required}
            className="mt-2"
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