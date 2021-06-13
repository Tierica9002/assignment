import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/auth-context";
enum errorMessages {
  INVALID_USERNAME = "Invalid username.",
  INVALID_PASSWORD = "Invalid password.",
}

enum FormErrorMessages {
  INVALID_CREDENTIALS = "Invalid credentials.",
}

const Login = (): JSX.Element => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [sessionExpired, setSessionExpired] = React.useState(false);
  const [passwordError, setPasswordError] =
    React.useState<errorMessages | null>(null);
  const [usernameError, setUsernameError] =
    React.useState<errorMessages | null>(null);
  const [formError, setFormError] = React.useState<FormErrorMessages | null>(
    null
  );

  const { login, token } = useAuth();
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (token) {
      history.push("/server-explorer");
    }
  }, [token]);

  React.useEffect(() => {
    if (location.hash === "#session_expired") {
      setSessionExpired(true);
    } else {
      setSessionExpired(false);
    }
  }, [sessionExpired]);

  const onChangeUserName = (username: string) => {
    setUsername(username);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
  };

  const isFormValid = (): boolean => {
    let isValid = true;

    if (!password) {
      setPasswordError(errorMessages.INVALID_PASSWORD);
      isValid = false;
    }
    if (!username) {
      setUsernameError(errorMessages.INVALID_USERNAME);
      isValid = false;
    }

    return isValid;
  };

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setFormError(null);
  };

  const signIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      clearErrors();
      login(username, password).then((isLoggedIn) => {
        console.log("inside login screen", isLoggedIn);
        if (!isLoggedIn) {
          setFormError(FormErrorMessages.INVALID_CREDENTIALS);
        } else {
          setFormError(null);
          history.push("/server-explorer");
        }
      });
    }
  };

  return (
    <div className="bg-white w-screen h-screen flex justify-items-center justify-center items-center shadow-md bg-gray-100">
      <div className="bg-white w-screen p-8 m-4 max-w-screen-sm rounded-md shadow-lg">
        <img className="w-16 m-auto" src={logo} alt="Logo" />
        <form onSubmit={signIn}>
          <div className="mb-4">
            <FormInput
              value={username}
              onChange={onChangeUserName}
              label="Username"
              id="username"
              errorMessage={usernameError}
              type="text"
            />
          </div>
          <div className="mb-6">
            <FormInput
              value={password}
              onChange={onChangePassword}
              label="Password"
              id="password"
              errorMessage={passwordError}
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">Sign In</Button>
            <span className="text-red-600">
              {formError}
              {sessionExpired &&
                "Your session has expired please re-authenticate"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
