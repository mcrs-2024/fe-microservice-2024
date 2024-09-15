import { Navigate, useNavigate } from 'react-router-dom';
import { authentication } from 'src/helpers';

import { homePageRoute, loginRoute } from './routes.contants';

const Root = () => {
  const navigate = useNavigate();
  const getRootUrl = () => {
    // check if user logged in or not and return url accordingly
    if (authentication.isUserAuthenticated() === false) {
      navigate(loginRoute);
      return loginRoute;
    }
    return homePageRoute;
  };

  const url = getRootUrl();

  return <Navigate to={`${url}`} />;
};

export default Root;
