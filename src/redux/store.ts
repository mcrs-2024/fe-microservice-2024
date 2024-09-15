import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
let store: any;

export function configureAppStore(initialState: object) {
  const localstore = configureStore({
    reducer: reducers,
    enhancers: [applyMiddleware(...middlewares)],
    preloadedState: initialState,
  });
  sagaMiddleware.run(rootSaga);
  store = localstore;
  return localstore;
}
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
