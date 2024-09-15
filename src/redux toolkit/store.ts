import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});
export type RootStateToolKit = ReturnType<typeof store.getState>;
export type AppDispatchToolKit = typeof store.dispatch;

export default store;
