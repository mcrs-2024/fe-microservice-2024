import { useEffect, useState } from 'react';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { AuthState } from 'src/redux/reducers';

import useRedux from './useRedux';

export const usePermission = (action: PERMISSION_CODES) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const { appSelector } = useRedux();
  const { currentPagePermissions } = appSelector(AuthState);

  useEffect(() => {
    setIsAllowed(
      currentPagePermissions !== null
        ? currentPagePermissions.includes(action)
        : false,
    );
  }, [action, currentPagePermissions]);

  return isAllowed;
};
