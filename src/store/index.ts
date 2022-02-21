import { createStore, AnyAction } from 'redux';
import { SET_USER } from './actions';

export const initialState: RootState = {
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payloud };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
);

export default store;
