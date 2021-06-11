import React from "react";

type FormInputProps = {
  value: string;
  label: string;
  errorMessage?: string | null;
  onChange: (val: string) => void;
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 mb-1 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default FormInput;
