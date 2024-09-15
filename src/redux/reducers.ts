import { createSelector } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import buttonReducer from '../redux toolkit/buttonsSlice';

import Auth, { AuthStateTypes } from './auth/reducers';
import { LayoutStateTypes } from './layout/constants';
import Layout from './layout/reducers';
import { RootState } from './store';

export const LayoutState = createSelector(
  (state: RootState) => state,
  ({ Layout }) => Layout as LayoutStateTypes,
);

export const AuthState = createSelector(
  (state: RootState) => state,
  ({ Auth }) => Auth as AuthStateTypes,
);

export default combineReducers({
  Layout,
  Auth,
  buttons: buttonReducer,
});
