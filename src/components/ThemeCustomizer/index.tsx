import React, { useCallback, useEffect, useState } from 'react';
// actions
import { Link } from 'react-router-dom';
import * as layoutConstants from 'src/constants/common/layout';
import { LayoutState } from 'src/redux/reducers';

// constants
// custom hook
import { useRedux, useViewport } from '../../hooks/';
import {
  changeLayout,
  changeLayoutTheme,
  changeLayoutWidth,
  changeMenuPositions,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  toggleSidebarUserInfo,
} from '../../redux/actions';

import LayoutTheme from './LayoutTheme';
// components
import LayoutTypes from './LayoutTypes';
import LayoutWidth from './LayoutWidth';
import LeftSideBarTheme from './LeftSideBarTheme';
import LeftSideBarType from './LeftSideBarType';
import MenuPositions from './MenuPositions';
import SidebarUserInfo from './SidebarUserInfo';
import TopbarTheme from './TopbarTheme';

const ThemeCustomizer = () => {
  const { dispatch, appSelector } = useRedux();
  const { width } = useViewport();

  const {
    layoutType,
    layoutTheme,
    layoutWidth,
    menuPosition,
    leftSideBarType,
    leftSideBarTheme,
    showSidebarUserInfo,
    topbarTheme,
  } = appSelector(LayoutState);

  const [disableLayoutWidth, setDisableLayoutWidth] = useState<boolean>(false);
  const [disableMenuPositions, setDisableMenuPositions] =
    useState<boolean>(false);
  const [disableSidebarTheme, setDisableSidebarTheme] =
    useState<boolean>(false);
  const [disableSidebarType, setDisableSidebarType] = useState<boolean>(false);
  const [disableSidebarUser, setDisableSidebarUser] = useState<boolean>(false);

  /**
   * change state based on props changes
   */
  const _loadStateFromProps = useCallback(() => {
    setDisableLayoutWidth(
      layoutType !== layoutConstants.LayoutTypes.LAYOUT_DETACHED,
    );
    setDisableMenuPositions(
      layoutType !== layoutConstants.LayoutTypes.LAYOUT_TWO_COLUMN &&
        layoutType !== layoutConstants.LayoutTypes.LAYOUT_DETACHED,
    );
    setDisableSidebarTheme(
      layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL,
    );
    setDisableSidebarType(
      layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL &&
        layoutType !== layoutConstants.LayoutTypes.LAYOUT_TWO_COLUMN &&
        width > 991,
    );
    setDisableSidebarUser(
      layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL,
    );
  }, [layoutType, width]);

  useEffect(() => {
    _loadStateFromProps();
  }, [_loadStateFromProps]);

  /**
   * On layout change
   */
  const changeLayoutType = (value: any) => {
    const layout = value;
    switch (layout) {
      case 'horizontal':
        dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL));
        break;
      case 'detached':
        dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_DETACHED));
        break;
      case 'vertical':
        dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_VERTICAL));
        break;
      default:
        dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_TWO_COLUMN));
        break;
    }
  };

  /**
   * Changes the layout theme
   */
  const changeLayoutColor = (value: string) => {
    const theme = value;
    switch (theme) {
      case 'dark':
        dispatch(changeLayoutTheme(layoutConstants.LayoutTheme.THEME_DARK));
        break;
      default:
        dispatch(changeLayoutTheme(layoutConstants.LayoutTheme.THEME_LIGHT));
        break;
    }
  };

  /**
   * Change the width mode
   */
  const changeWidthMode = (value: any) => {
    const mode = value;

    switch (mode) {
      case 'boxed':
        dispatch(
          changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_BOXED),
        );
        break;
      default:
        dispatch(
          changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID),
        );
        break;
    }
  };

  /*
   * Change menus position
   */
  const changeMenuPosition = (value: any) => {
    const position = value;

    switch (position) {
      case 'scrollable':
        dispatch(
          changeMenuPositions(
            layoutConstants.MenuPositions.MENU_POSITION_SCROLLABLE,
          ),
        );
        break;
      default:
        dispatch(
          changeMenuPositions(
            layoutConstants.MenuPositions.MENU_POSITION_FIXED,
          ),
        );
        break;
    }
  };

  /**
   * Changes the theme
   */
  const changeLeftSidebarTheme = (value: any) => {
    const theme = value;
    switch (theme) {
      case 'dark':
        dispatch(
          changeSidebarTheme(
            layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK,
          ),
        );
        break;
      case 'brand':
        dispatch(
          changeSidebarTheme(
            layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_BRAND,
          ),
        );
        break;
      case 'gradient':
        dispatch(
          changeSidebarTheme(
            layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_GRADIENT,
          ),
        );
        break;
      default:
        dispatch(
          changeSidebarTheme(
            layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT,
          ),
        );
        break;
    }
  };

  /**
   * Change the leftsiderbar type
   */
  const changeLeftSiderbarType = (value: any) => {
    const type = value;
    switch (type) {
      case 'condensed':
        dispatch(
          changeSidebarType(
            layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED,
          ),
        );
        break;
      case 'compact':
        dispatch(
          changeSidebarType(
            layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT,
          ),
        );
        break;
      default:
        dispatch(
          changeSidebarType(
            layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
          ),
        );
        break;
    }
  };

  /*
   * Toggle the leftsidebar use info
   */
  const toggleLeftSidebarUserInfo = (value: any) => {
    const checked = value;
    dispatch(toggleSidebarUserInfo(checked));
  };

  /*
   * Change topbar theme
   */
  const changeTopBarTheme = (value: any) => {
    const theme = value;
    switch (theme) {
      case 'light':
        dispatch(
          changeTopbarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_LIGHT),
        );
        break;
      case 'dark':
        dispatch(
          changeTopbarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_DARK),
        );
        break;
      default:
        dispatch(
          changeTopbarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_BRAND),
        );
        break;
    }
  };

  /**
   * Reset everything
   */
  const reset = () => {
    changeLayoutType(layoutConstants.LayoutTypes.LAYOUT_TWO_COLUMN);
    changeWidthMode(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID);
    changeMenuPosition(layoutConstants.MenuPositions.MENU_POSITION_FIXED);
    changeLeftSidebarTheme(
      layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT,
    );
    toggleLeftSidebarUserInfo(false);
    changeTopBarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_BRAND);
    changeLeftSiderbarType(
      layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
    );
  };

  return (
    <React.Fragment>
      <h6 className='fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light'>
        <span className='d-block py-1'>Theme Settings</span>
      </h6>
      <div className='p-3'>
        <div className='alert alert-warning' role='alert'>
          <strong>Customize </strong> the overall color scheme, sidebar menu,
          etc.
        </div>

        {/* Layouts */}
        <LayoutTypes
          changeLayoutType={changeLayoutType}
          layoutType={layoutType}
          layoutConstants={layoutConstants.LayoutTypes}
        />

        <LayoutTheme
          changeLayoutColor={changeLayoutColor}
          layoutTheme={layoutTheme}
          layoutConstants={layoutConstants.LayoutTheme}
        />

        {/* Width */}
        {disableLayoutWidth && (
          <LayoutWidth
            changeWidthMode={changeWidthMode}
            layoutWidth={layoutWidth}
            layoutConstants={layoutConstants.LayoutWidth}
          />
        )}

        {/* Topbar */}
        <TopbarTheme
          changeTopBarTheme={changeTopBarTheme}
          topbarTheme={topbarTheme}
          layoutConstants={layoutConstants.TopbarTheme}
        />

        {/* Menu Posiotions */}
        {disableMenuPositions && (
          <MenuPositions
            menuPosition={menuPosition}
            changeMenuPosition={changeMenuPosition}
            layoutConstants={layoutConstants.MenuPositions}
          />
        )}

        {/* Left Sidebar */}
        {disableSidebarTheme && (
          <LeftSideBarTheme
            changeLeftSidebarTheme={changeLeftSidebarTheme}
            leftSideBarTheme={leftSideBarTheme}
            layoutConstants={layoutConstants.SideBarTheme}
          />
        )}

        {/* Left Sidebar Size */}
        {disableSidebarType && (
          <LeftSideBarType
            changeLeftSiderbarType={changeLeftSiderbarType}
            leftSideBarType={leftSideBarType}
            layoutConstants={layoutConstants.SideBarTypes}
          />
        )}

        {/* User Info */}
        {disableSidebarUser && (
          <SidebarUserInfo
            toggleLeftSidebarUserInfo={toggleLeftSidebarUserInfo}
            showSidebarUserInfo={showSidebarUserInfo}
          />
        )}

        <div className='d-grid mt-4'>
          <button
            className='btn btn-primary'
            id='resetBtn'
            onClick={() => reset()}
          >
            Reset to Default
          </button>
          <Link
            to='https://themeforest.net/item/minton-react-admin-dashboard-template/38542078'
            className='btn btn-danger mt-2'
            target='_blank'
          >
            <i className='mdi mdi-basket me-1' />
            Purchase Now
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThemeCustomizer;
