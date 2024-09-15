import { Suspense, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Loading from 'src/components/Loading';
import envConfig from 'src/config';
import { LayoutTypes } from 'src/constants/common/layout';
// All layouts containers
import * as layoutConstants from 'src/constants/common/layout';
import { authentication } from 'src/helpers';
import Error404 from 'src/pages/error/Error404';
import { changeSidebarType } from 'src/redux/actions';

// routes
// layout constants
// custom hook
import { useRedux, useViewport } from '../hooks/';
import DefaultLayout from '../layouts/Default';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal/';
import TwoColumnLayout from '../layouts/TwoColumn/';
import VerticalLayout from '../layouts/Vertical';

import {
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
} from './index';

interface IRoutesProps {}

const AllRoutes = (props: IRoutesProps) => {
  const { appSelector, dispatch } = useRedux();
  const { layout } = appSelector(state => ({
    layout: state.Layout,
  }));

  const { width } = useViewport();

  const getLayout = () => {
    let layoutCls = TwoColumnLayout;

    switch (layout.layoutType) {
      case LayoutTypes.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      case LayoutTypes.LAYOUT_DETACHED:
        layoutCls = DetachedLayout;
        break;
      case LayoutTypes.LAYOUT_VERTICAL:
        layoutCls = VerticalLayout;
        break;
      default:
        layoutCls = TwoColumnLayout;
        break;
    }
    return layoutCls;
  };

  const Layout = getLayout();

  useEffect(() => {
    if (
      width < 1024 &&
      layout.sidebarType !==
        layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED
    ) {
      dispatch(
        changeSidebarType(
          layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED,
        ),
      );
    }
  }, [width % 2]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route>
          {publicProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <DefaultLayout {...props} layout={layout}>
                  {route.element}
                </DefaultLayout>
              }
              key={idx}
            />
          ))}
        </Route>

        <Route>
          {authProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                authentication.isUserAuthenticated() === false &&
                !envConfig.AUTH_DISABLE ? (
                  <Navigate
                    to={{
                      pathname: '/auth/login',
                      search: 'next=' + route.path,
                    }}
                  />
                ) : (
                  <Suspense fallback={<Loading />}>
                    <Layout {...props}>{route.element}</Layout>
                  </Suspense>
                )
              }
              key={idx}
            />
          ))}
        </Route>
        <Route path='*' element={<Error404 />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default AllRoutes;
