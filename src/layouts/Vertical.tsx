import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { LayoutState } from 'src/redux/reducers';

// constants
import { LayoutTypes, SideBarTypes } from '../constants/common';
// hooks
import { useRedux } from '../hooks/';
// actions
import { changeSidebarType } from '../redux/actions';
// utils
import { changeHTMLAttribute } from '../utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('./Topbar'));
const LeftSidebar = React.lazy(() => import('./LeftSidebar'));
const Footer = React.lazy(() => import('./Footer'));
const RightSidebar = React.lazy(() => import('./RightSidebar/'));

const loading = () => <div className=''></div>;

interface VerticalLayoutProps {
  children?: any;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  const { dispatch, appSelector } = useRedux();

  const {
    layoutTheme,
    layoutWidth,
    menuPosition,
    leftSideBarTheme,
    leftSideBarType,
    showSidebarUserInfo,
    topbarTheme,
  } = appSelector(LayoutState);

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  /*
    layout defaults
    */
  useEffect(() => {
    changeHTMLAttribute('data-layout-mode', LayoutTypes.LAYOUT_VERTICAL);
  }, []);

  useEffect(() => {
    changeHTMLAttribute('data-bs-theme', layoutTheme);
  }, [layoutTheme]);

  useEffect(() => {
    changeHTMLAttribute('data-layout-width', layoutWidth);
  }, [dispatch, layoutWidth]);

  useEffect(() => {
    changeHTMLAttribute('data-layout-menu-position', menuPosition);
  }, [menuPosition]);

  useEffect(() => {
    changeHTMLAttribute('data-menu-color', leftSideBarTheme);
  }, [leftSideBarTheme]);

  useEffect(() => {
    changeHTMLAttribute('data-sidebar-size', leftSideBarType);
  }, [leftSideBarType]);

  useEffect(() => {
    changeHTMLAttribute('data-topbar-color', topbarTheme);
  }, [topbarTheme]);

  useEffect(() => {
    changeHTMLAttribute('data-sidebar-user', showSidebarUserInfo.toString());
  }, [showSidebarUserInfo]);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(prevState => !prevState);

    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove('sidebar-enable');
      } else {
        document.body.classList.add('sidebar-enable');
      }
    }
  };

  const updateDimensions = useCallback(() => {
    // activate the condensed sidebar if smaller devices like ipad or tablet
    if (window.innerWidth > 768 && window.innerWidth <= 1028) {
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
    } else if (window.innerWidth > 1028) {
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [dispatch, updateDimensions]);

  const isCondensed: boolean =
    leftSideBarType === SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;

  return (
    <>
      <div id='wrapper'>
        <Suspense fallback={loading()}>
          <Topbar openLeftMenuCallBack={openMenu} hideLogo={false} />
        </Suspense>
        <Suspense fallback={loading()}>
          <LeftSidebar isCondensed={isCondensed} />
        </Suspense>
        <div className='content-page'>
          <div className='content'>
            <Container fluid>
              <Suspense fallback={loading()}>{children}</Suspense>
            </Container>
          </div>

          <Suspense fallback={loading()}>
            <Footer />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={loading()}>
        <RightSidebar />
      </Suspense>
    </>
  );
};
export default VerticalLayout;
