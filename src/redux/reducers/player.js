import { REQUEST_PLAY_ACESS, SAVE_USERS_INFO, SCORE_OPERATION } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
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
  case SCORE_OPERATION:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default userReducer;
