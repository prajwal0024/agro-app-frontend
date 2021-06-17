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

  if (action.type === actionTypes.ACTION_USER_IMAGE_CHANGE) {
    return { ...state, user: { ...state.user, image: action.payload } };
  }

  if (action.type === actionTypes.ACTION_SET_USER_LOCATION) {
    return {
      ...state,
      user: { ...state.user, location: { name: action.payload } },
    };
  }

  return state;
};

export default authReducer;
