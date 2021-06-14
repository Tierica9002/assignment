import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

describe("Login form", () => {
  const defaultProps = {
    formState: {
      username: {
        value: "testUser",
        error: "testUserError",
      },
      password: {
        value: "testPassword",
        error: "testPasswordError",
      },
      formError: "testFormError",
      isLoading: false,
    },
    onChangeUsername: jest.fn(),
    onChangePassword: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onChangeUsername.mockReset();
    defaultProps.onChangePassword.mockReset();
    defaultProps.onSubmit.mockReset();
  });

  it("renders login form based on state", () => {
    render(<LoginForm {...defaultProps} />);

    const username = screen.getByRole("textbox", {
      name: /username/i,
    });
    const password = screen.getByLabelText(/password/i);
    const userError = screen.getByText(/testUserError/i);
    const passwordError = screen.getByText(/testPasswordError/i);

    expect(username).toHaveValue(defaultProps.formState.username.value);
    expect(password).toHaveValue(defaultProps.formState.password.value);
    expect(userError).toHaveTextContent(defaultProps.formState.username.error);
    expect(passwordError).toHaveTextContent(
      defaultProps.formState.password.error
    );
  });

  it("calls callback functions when input fields are updated", () => {
    render(<LoginForm {...defaultProps} />);
    const typedValue = "a";
    userEvent.type(
      screen.getByRole("textbox", {
        name: /username/i,
      }),
      typedValue
    );

    expect(defaultProps.onChangeUsername).toHaveBeenCalledWith(
      `${defaultProps.formState.username.value}${typedValue}`
    );

    userEvent.type(screen.getByLabelText(/password/i), typedValue);

    expect(defaultProps.onChangePassword).toHaveBeenCalledWith(
      `${defaultProps.formState.password.value}${typedValue}`
    );
  });

  it("calls the onSubmit callback when submit button is clicked", () => {
    render(<LoginForm {...defaultProps} />);

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    userEvent.click(button);
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
