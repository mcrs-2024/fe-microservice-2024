import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { LayoutState } from 'src/redux/reducers';

// constants
import { LayoutTypes, SideBarTypes } from '../constants/common';
// hooks
import { useRedux } from '../hooks/';
// actions
import { toggleSidebarUserInfo } from '../redux/actions';
// utils
import { changeHTMLAttribute } from '../utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('./Topbar'));
const LeftSidebar = React.lazy(() => import('./LeftSidebar'));
const Footer = React.lazy(() => import('./Footer'));
const RightSidebar = React.lazy(() => import('./RightSidebar'));

const loading = () => <div className='text-center'></div>;

interface VerticalLayoutProps {
  children?: any;
}

const DetachedLayout = ({ children }: VerticalLayoutProps) => {
  const { dispatch, appSelector } = useRedux();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const {
    layoutWidth,
    layoutTheme,
    menuPosition,
    leftSideBarTheme,
    leftSideBarType,
    topbarTheme,
    showSidebarUserInfo,
    isOpenRightSideBar,
  } = appSelector(LayoutState);

  /*
    layout defaults
    */
  useEffect(() => {
    changeHTMLAttribute('data-layout-mode', LayoutTypes.LAYOUT_DETACHED);
    dispatch(toggleSidebarUserInfo(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    changeHTMLAttribute('data-bs-theme', layoutTheme);
  }, [layoutTheme]);

  useEffect(() => {
    changeHTMLAttribute('data-layout-width', layoutWidth);
  }, [layoutWidth]);

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
        document.body.classList.add('sidebar-enable');
      } else {
        document.body.classList.remove('sidebar-enable');
      }
    }
  };

  const isCondensed =
    leftSideBarType === SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;

  return (
    <>
      <div id='wrapper'>
        <Suspense fallback={loading()}>
          <Topbar
            openLeftMenuCallBack={openMenu}
            navCssClasses='topnav-navbar topnav-navbar-dark'
            topbarDark={true}
          />
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
      {isOpenRightSideBar && (
        <Suspense fallback={loading()}>
          <RightSidebar />
        </Suspense>
      )}
    </>
  );
};

export default DetachedLayout;
