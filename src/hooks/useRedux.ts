// src/hooks/reduxHooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type {
  AppDispatchToolKit,
  RootStateToolKit,
} from '../redux toolkit/store';
import type { AppDispatch, RootState } from '../redux/store';

// Redux Toolkit hooks
export const useAppDispatch = () => useDispatch<AppDispatchToolKit>();
export const useAppSelector: TypedUseSelectorHook<RootStateToolKit> =
  useSelector;

// Redux Saga hooks
const useRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appSelector: TypedUseSelectorHook<RootState> = useSelector;
  return { dispatch, appSelector };
};

export default useRedux;
