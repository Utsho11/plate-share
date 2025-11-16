import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type TFormInput = {
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const PSTextArea = ({ name, placeholder, required }: TFormInput) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Textarea
          {...field}
          value={field.value ?? ""}
          placeholder={placeholder}
          required={required}
        />
      )}
    />
  );
};

export default PSTextArea;
