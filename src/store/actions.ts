export const SET_USER = 'SET_USER';
export const SET_NEW_MOVIE = 'SET_NEW_MOVIE';
export const CLEAR_NEW_MOVIE = 'CLEAR_NEW_MOVIE';
export const SET_MOVIES_LIST = 'SET_MOVIES_LIST';

export const setUser = (payloud: User | null = null) => ({ type: SET_USER, payloud });
export const setNewMovie = (payloud: Movie) => ({ type: SET_NEW_MOVIE, payloud });
export const clearNewMovie = () => ({ type: CLEAR_NEW_MOVIE });
export const setMoviesList = (payloud: Movie[]) => ({ type: SET_MOVIES_LIST, payloud });
