import * as actionTypes from '../constants/actionTypes';

export const setUser = (userInfo) => ({
  type: actionTypes.ACTION_SETUSER,
  payload: { ...userInfo },
});
