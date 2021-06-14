import React from "react";
import { useLocation } from "react-router-dom";
import { useSafeDispatch } from "../../utils/hooks";

export enum Fields {
  USERNAME = "username",
  PASSWORD = "password",
}

export enum FieldErrorMessages {
  INVALID_USERNAME = "Invalid username.",
  INVALID_PASSWORD = "Invalid password.",
}

type Action =
  | { type: "set_field_value"; payload: { field: Fields; value: string } }
  | {
      type: "set_field_error";
      payload: { field: Fields; value: FieldErrorMessages | "" };
    }
  | { type: "set_form_error"; payload: string }
  | { type: "set_is_loading"; payload: boolean };

interface FieldState {
  value: string;
  error: string;
}

export interface LoginFormState {
  username: FieldState;
  password: FieldState;
  formError: string;
  isLoading: boolean;
}

const initialState = {
  username: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
  formError: "",
  isLoading: false,
};

const formReducer = (state: LoginFormState, action: Action): LoginFormState => {
  switch (action.type) {
    case "set_field_value": {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: {
          ...state[field],
          value: value,
        },
      };
    }
    case "set_field_error": {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: {
          ...state[field],
          error: value,
        },
      };
    }
    case "set_form_error": {
      return { ...state, formError: action.payload };
    }

    case "set_is_loading": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
  }
};

export const useLoginForm = (): [LoginFormState, React.Dispatch<Action>] => {
  const [state, dispatch] = React.useReducer(formReducer, initialState);
  const location = useLocation();
  const safeDispatch = useSafeDispatch(dispatch);

  React.useEffect(() => {
    if (location.hash === "#session_expired") {
      safeDispatch({
        type: "set_form_error",
        payload: "Your session has expired please re-authenticate",
      });
    }
  }, []);

  return [state, safeDispatch];
};
