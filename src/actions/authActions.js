import * as actionTypes from '../constants/actionTypes';

export const setUser = (userInfo) => ({
  type: actionTypes.ACTION_SETUSER,
  payload: { ...userInfo },
});

export const logout = () => ({
  type: actionTypes.ACTION_LOGOUT,
});
