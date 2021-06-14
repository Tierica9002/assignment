import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useLoginForm, Fields, FieldErrorMessages } from "./useLoginForm";
import LoginForm from "../../components/LoginForm";

const Login = (): JSX.Element => {
  const history = useHistory();
  const { login, token } = useAuth();
  const [state, dispatch] = useLoginForm();

  React.useEffect(() => {
    if (token) {
      history.push("/server-explorer");
    }
  }, [token]);

  const onChangeUsername = (username: string) => {
    dispatch({
      type: "set_field_value",
      payload: {
        field: Fields.USERNAME,
        value: username,
      },
    });
  };

  const onChangePassword = (password: string) => {
    dispatch({
      type: "set_field_value",
      payload: {
        field: Fields.PASSWORD,
        value: password,
      },
    });
  };

  const setFieldErrors = (username: string, password: string) => {
    if (!username) {
      dispatch({
        type: "set_field_error",
        payload: {
          field: Fields.USERNAME,
          value: FieldErrorMessages.INVALID_USERNAME,
        },
      });
    } else {
      dispatch({
        type: "set_field_error",
        payload: {
          field: Fields.USERNAME,
          value: "",
        },
      });
    }

    if (!password) {
      dispatch({
        type: "set_field_error",
        payload: {
          field: Fields.PASSWORD,
          value: FieldErrorMessages.INVALID_PASSWORD,
        },
      });
    } else {
      dispatch({
        type: "set_field_error",
        payload: {
          field: Fields.PASSWORD,
          value: "",
        },
      });
    }
  };

  const signIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = state;

    if (username && password) {
      setFieldErrors(username, password);
      dispatch({
        type: "set_is_loading",
        payload: true,
      });
      login(username, password).then(({ message }) => {
        if (message) {
          dispatch({
            type: "set_form_error",
            payload: message,
          });
        } else {
          dispatch({
            type: "set_form_error",
            payload: "",
          });
          history.push("/server-explorer");
        }
        dispatch({
          type: "set_is_loading",
          payload: false,
        });
      });
    } else {
      setFieldErrors(username, password);
    }
  };

  return (
    <div className="bg-white w-screen h-screen flex justify-items-center justify-center items-center shadow-md bg-gray-100">
      <LoginForm
        onSubmit={signIn}
        onChangePassword={onChangePassword}
        onChangeUsername={onChangeUsername}
        formState={state}
      />
    </div>
  );
};

export default Login;
