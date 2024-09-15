// action constants
import {
  LayoutTheme,
  LayoutTypes,
  LayoutWidth,
  MenuPositions,
  SideBarTheme,
  SideBarTypes,
  TopbarTheme,
} from 'src/constants/common/layout';

import { getLayoutConfigs } from '../../utils';

// app constants
// actions
import { LayoutActionType } from './actions';
import { LayoutActionTypes, LayoutStateTypes } from './constants';

// utils

const INIT_STATE = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return {
    layoutType:
      params['layout_type'] === 'horizontal'
        ? LayoutTypes.LAYOUT_HORIZONTAL
        : params['layout_type'] === 'detached'
          ? LayoutTypes.LAYOUT_DETACHED
          : params['layout_type'] === 'twocol'
            ? LayoutTypes.LAYOUT_TWO_COLUMN
            : LayoutTypes.LAYOUT_VERTICAL,
    layoutTheme:
      params['layout_theme'] === 'dark'
        ? LayoutTheme.THEME_DARK
        : LayoutTheme.THEME_LIGHT,
    layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID,
    menuPosition: MenuPositions.MENU_POSITION_FIXED,
    leftSideBarTheme: SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT,
    leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
    showSidebarUserInfo: false,
    topbarTheme: TopbarTheme.TOPBAR_THEME_BRAND,
    isOpenRightSideBar: false,
    changeShowTitlePages: [],
  };
};

const Layout = (
  state: LayoutStateTypes = INIT_STATE(),
  action: LayoutActionType<string | boolean | null>,
) => {
  switch (action.type) {
    case LayoutActionTypes.CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      };
    case LayoutActionTypes.CHANGE_LAYOUT_THEME:
      return {
        ...state,
        layoutTheme: action.payload,
      };
    case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
      const layoutConfig = getLayoutConfigs(action.payload! && action.payload);
      return {
        ...state,
        layoutWidth: action.payload,
        ...layoutConfig,
      };
    case LayoutActionTypes.CHANGE_MENU_POSITIONS:
      return {
        ...state,
        menuPosition: action.payload,
      };
    case LayoutActionTypes.CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSideBarTheme: action.payload,
      };
    case LayoutActionTypes.CHANGE_SIDEBAR_TYPE:
      return {
        ...state,
        leftSideBarType: action.payload,
      };
    case LayoutActionTypes.TOGGLE_SIDEBAR_USER_INFO:
      return {
        ...state,
        showSidebarUserInfo: action.payload,
      };
    case LayoutActionTypes.CHANGE_TOPBAR_THEME:
      return {
        ...state,
        topbarTheme: action.payload,
      };
    case LayoutActionTypes.SHOW_RIGHT_SIDEBAR:
      return {
        ...state,
        isOpenRightSideBar: true,
      };
    case LayoutActionTypes.HIDE_RIGHT_SIDEBAR:
      return {
        ...state,
        isOpenRightSideBar: false,
      };
    case LayoutActionTypes.CHANGE_PAGETITLE:
      return {
        ...state,
        changeShowTitlePages: [action.payload],
      };
    default:
      return state;
  }
};

export default Layout;
