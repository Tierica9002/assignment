import React from "react";
import ExclamationCircle from "./icons/ExclamantionCircle";

type FormInputProps = {
  value: string;
  label: string;
  errorMessage?: string | null;
  onChange?: (val: string) => void;
  type: string;
  placeholder?: string;
  id: string;
};

const FormInput = ({
  value,
  onChange,
  label,
  id,
  errorMessage,
  ...props
}: FormInputProps): JSX.Element => {
  return (
    <>
      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-1"
        id={id}
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
        {...props}
      />
      {errorMessage && (
        <p className="absolute text-red-600 text-xs italic">
          <ExclamationCircle />
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default FormInput;
