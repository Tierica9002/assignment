import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md"
      {...props}
    />
  );
};

export default Button;
