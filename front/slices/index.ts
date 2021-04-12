import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import userSlice from './user';

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user: userSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

// const rootReducer = combineReducers({
//   user: userSlice.reducer,
// });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
