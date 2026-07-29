import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type TFormInput = {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const PSInput = ({
  name,
  type = "text",
  placeholder,
  required,
}: TFormInput) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          value={field.value ?? ""}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      )}
    />
  );
};

export default PSInput;
