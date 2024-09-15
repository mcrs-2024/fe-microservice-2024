import { Navigate, Route } from 'react-router-dom';
import { authentication } from 'src/helpers/auth';

// interface PrivateRouteProps {
//   component: React.FunctionComponent;
//   roles?: string;
// }

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (authentication.isUserAuthenticated() === false) {
          // not logged in so redirect to login page with the return url
          return (
            <Navigate
              to={'/auth/login'}
              state={{ from: props['location'] }}
              // to={{
              //   pathname: "/auth/login",
              //   state: { from: props["location"] },
              // }}
            />
          );
        }

        const loggedInUser = authentication.getLoggedInUser();
        const currentUserRoles = loggedInUser?.roles;

        if (!currentUserRoles) {
          // If no user roles, redirect to home
          return <Navigate to={{ pathname: '/' }} />;
        }

        for (const userRole of currentUserRoles) {
          if (roles.indexOf(userRole) === -1) {
            // Role not authorised so redirect to home page
            return <Navigate to={{ pathname: '/' }} />;
          }
        }

        // If all roles are authorised, return the component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
