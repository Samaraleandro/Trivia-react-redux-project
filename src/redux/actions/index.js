export const REQUEST_PLAY_ACESS = 'REQUEST_PLAY_ACESS';
export const SAVE_USERS_INFO = 'SAVE_USERS_INFO';
export const SCORE_OPERATION = 'SCORE_OPERATION';
export const IMG_GRAVATAR = 'IMG_GRAVATAR';
export const RESET_STATE = 'RESET_STATE';

export const handleAction = (action, payload) => ({ type: action, payload });

export const requestAcess = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  localStorage.setItem('token', data.token);
  dispatch(handleAction(REQUEST_PLAY_ACESS, data.token));
};
