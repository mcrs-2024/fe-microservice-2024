import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
// actions
import { LayoutTypes, SideBarTheme } from 'src/constants/common/layout';
import { LayoutState } from 'src/redux/reducers';

// hooks
import { useRedux } from '../../hooks/';
// utils
import { changeHTMLAttribute } from '../../utils';

// constants
// import LeftSideBarTheme from "../../components/ThemeCustomizer/LeftSideBarTheme";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('../Topbar'));
const Footer = React.lazy(() => import('../Footer'));
const RightSidebar = React.lazy(() => import('../RightSidebar'));

const loading = () => <div className='text-center'></div>;

interface VerticalLayoutProps {
  children?: any;
}

const TwoColumnLayout = ({ children }: VerticalLayoutProps) => {
  const { dispatch, appSelector } = useRedux();

  const {
    layoutType,
    layoutTheme,
    layoutWidth,
    leftSideBarTheme,
    isOpenRightSideBar,
    topbarTheme,
    leftSideBarType,
  } = appSelector(LayoutState);

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  /*
   * layout defaults
   */
  useEffect(() => {
    changeHTMLAttribute('data-layout-mode', LayoutTypes.LAYOUT_TWO_COLUMN);
    changeHTMLAttribute(
      'data-two-column-color',
      SideBarTheme.LEFT_SIDEBAR_THEME_BRAND,
    );
    // dispatch(changeTopbarTheme(TopbarTheme.TOPBAR_THEME_LIGHT));
  }, []);

  useEffect(() => {
    changeHTMLAttribute('data-bs-theme', layoutTheme);
  }, [layoutTheme]);

  useEffect(() => {
    changeHTMLAttribute('data-layout-width', layoutWidth);
  }, [layoutWidth]);

  useEffect(() => {
    changeHTMLAttribute('data-menu-color', leftSideBarTheme);
  }, [leftSideBarTheme]);

  useEffect(() => {
    changeHTMLAttribute('data-topbar-color', topbarTheme);
  }, [topbarTheme]);

  useEffect(() => {
    changeHTMLAttribute('data-sidebar-size', leftSideBarType);
  }, [leftSideBarType]);

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

  return (
    <>
      <div id='wrapper'>
        <Suspense fallback={loading()}>
          <Topbar openLeftMenuCallBack={openMenu} topbarDark={true} />
        </Suspense>
        {/* <Suspense fallback={loading()}>
          <LeftSidebar />
        </Suspense> */}

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

export default TwoColumnLayout;
