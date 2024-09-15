import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { LayoutTypes } from 'src/constants/common/layout';
import { LayoutState } from 'src/redux/reducers';

// hooks
import { useRedux } from '../../hooks/';
// constants
// utils
import { changeHTMLAttribute } from '../../utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('../Topbar'));
const Navbar = React.lazy(() => import('./Navbar'));
const Footer = React.lazy(() => import('../Footer'));
const RightSidebar = React.lazy(() => import('../RightSidebar'));

const loading = () => <div className='text-center'></div>;

interface HorizontalLayoutProps {
  children?: any;
}

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  const { dispatch, appSelector } = useRedux();

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const {
    layoutTheme,
    layoutWidth,
    menuPosition,
    topbarTheme,
    isOpenRightSideBar,
  } = appSelector(LayoutState);

  /*
    layout defaults
    */
  useEffect(() => {
    changeHTMLAttribute('data-layout-mode', LayoutTypes.LAYOUT_HORIZONTAL);
  }, [dispatch]);

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
    changeHTMLAttribute('data-topbar-color', topbarTheme);
  }, [topbarTheme]);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove('sidebar-enable');
      } else {
        document.body.classList.add('sidebar-enable');
      }
    }
  };

  return (
    <>
      <div id='wrapper'>
        <Suspense fallback={loading()}>
          <Topbar openLeftMenuCallBack={openMenu} topbarDark={false} />
        </Suspense>

        <Suspense fallback={loading()}>
          <Navbar isMenuOpened={isMenuOpened} />
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

          {isOpenRightSideBar && (
            <Suspense fallback={loading()}>
              <RightSidebar />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default HorizontalLayout;
