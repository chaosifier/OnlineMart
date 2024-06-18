import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'

// const initialState = {
//   user: {}
// };
export const store = configureStore({
  reducer: {
    user: userReducer,
    // more reducers
  },
  // preloadedState: initialState,
})
