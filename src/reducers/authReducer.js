import * as actionTypes from '../constants/actionTypes';

const intialState = {
  user: {},
};

const authReducer = (state = intialState, action) => {
  if (action.type === actionTypes.ACTION_SETUSER) {
    return { ...state, user: { ...state.user, ...action.payload } };
  }

  if (action.type === actionTypes.ACTION_LOGOUT) {
    return { ...state, user: null };
  }

  return state;
};

export default authReducer;
