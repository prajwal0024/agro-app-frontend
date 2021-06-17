import * as actionTypes from '../constants/actionTypes';

export const setUserImage = (userImage) => ({
  type: actionTypes.ACTION_USER_IMAGE_CHANGE,
  payload: userImage,
});

export const setUserLocation = (name) => ({
  type: actionTypes.ACTION_SET_USER_LOCATION,
  payload: name,
});
