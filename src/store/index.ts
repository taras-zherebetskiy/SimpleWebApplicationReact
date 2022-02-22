import { createStore, AnyAction } from 'redux';
import {
  SET_USER,
  SET_NEW_MOVIE,
  CLEAR_NEW_MOVIE,
  SET_MOVIES_LIST,
} from './actions';

export const initialState: RootState = {
  user: null,
  newMovies: [],
  moviesList: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payloud };

    case SET_NEW_MOVIE:
      return { ...state, newMovies: [...state.newMovies, { ...action.payloud }] };

    case SET_MOVIES_LIST:
      return { ...state, moviesList: [...action.payloud] };

    case CLEAR_NEW_MOVIE:
      return { ...state, newMovies: [] };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
);

export default store;
