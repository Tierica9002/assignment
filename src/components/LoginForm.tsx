import React from "react";
import { LoginFormState } from "../screens/Login/useLoginForm";
import logo from "../assets/logo.png";
import FormInput from "./FormInput";
import Button from "./Button";

interface LoginFormProps {
  onSubmit: (e: React.SyntheticEvent) => void;
  formState: LoginFormState;
  onChangeUsername: (val: string) => void;
  onChangePassword: (val: string) => void;
}

const LoginForm = ({
  onSubmit,
  formState,
  onChangeUsername,
  onChangePassword,
}: LoginFormProps): JSX.Element => {
  return (
    <div className="bg-white w-screen p-8 m-4 max-w-screen-sm rounded-md shadow-lg">
      <img className="w-16 m-auto" src={logo} alt="Logo" />
      <form onSubmit={onSubmit}>
        <div className="mb-8">
          <FormInput
            value={formState.username.value}
            onChange={onChangeUsername}
            label="Username"
            id="username"
            errorMessage={formState.username.error}
            type="text"
          />
        </div>
        <div className="mb-8">
          <FormInput
            value={formState.password.value}
            onChange={onChangePassword}
            label="Password"
            id="password"
            errorMessage={formState.password.error}
            type="password"
          />
        </div>
        <div className="flex items-center justify-between">
          {!formState.isLoading ? (
            <Button type="submit">Sign In</Button>
          ) : (
            "Loading"
          )}
          <span className="text-red-600">{formState.formError}</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
