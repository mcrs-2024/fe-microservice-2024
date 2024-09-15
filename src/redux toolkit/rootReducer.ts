// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import buttonReducer from './buttonsSlice';

const rootReducer = combineReducers({
  buttons: buttonReducer,
});

export default rootReducer;
