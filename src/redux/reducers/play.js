import { REQUEST_PLAY_ACESS, SAVE_USERS_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  token: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USERS_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case REQUEST_PLAY_ACESS:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
