import initialState from './initialState';
import { INI_LOGGED_IN, LOGGED_IN, LOGGED_OUT } from './types';

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INI_LOGGED_IN:
      return {
        isLoggedIn: true,
      };
    case LOGGED_IN:
      return {
        isLoggedIn: true,
        user: payload,
      };

    case LOGGED_OUT:
      return { isLoggedIn: false };

    default:
      return state;
  }
};

export default authReducer;
