import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/user_action";

const initialState = {
  loginSuccess: false,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      console.log(action);
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess,
      };
    }
    case REGISTER_USER: {
      return {
        ...state,
      };
    }
    case AUTH_USER: {
      return { ...state, userData: action.payload };
    }
    default:
      return {
        ...state,
      };
  }
};
