// constants
import {
  LayoutTheme,
  LayoutTypes,
  LayoutWidth,
  MenuPositions,
  SideBarTheme,
  SideBarTypes,
  TopbarTheme,
} from 'src/constants/common/layout';
import { TMenu } from 'src/constants/types';

enum LayoutActionTypes {
  CHANGE_LAYOUT = '@@layout/CHANGE_LAYOUT',
  CHANGE_LAYOUT_THEME = '@@layout/CHANGE_LAYOUT_THEME',
  CHANGE_LAYOUT_WIDTH = '@@layout/CHANGE_LAYOUT_WIDTH',
  CHANGE_MENU_POSITIONS = '@@layout/CHANGE_MENU_POSITIONS',
  CHANGE_SIDEBAR_THEME = '@@layout/CHANGE_SIDEBAR_THEME',
  CHANGE_SIDEBAR_TYPE = '@@layout/CHANGE_SIDEBAR_TYPE',
  TOGGLE_SIDEBAR_USER_INFO = '@@layout/TOGGLE_SIDEBAR_USER_INFO',
  CHANGE_TOPBAR_THEME = '@@layout/CHANGE_TOPBAR_THEME',
  CHANGE_PAGETITLE = '@@layout/CHANGE_PAGETITLE',
  TOGGLE_TWO_TONE_ICONS = '@@layout/TOGGLE_TWO_TONE_ICONS',
  SHOW_RIGHT_SIDEBAR = '@@layout/SHOW_RIGHT_SIDEBAR',
  HIDE_RIGHT_SIDEBAR = '@@layout/HIDE_RIGHT_SIDEBAR',
}

export interface LayoutStateTypes {
  layoutType:
    | LayoutTypes.LAYOUT_VERTICAL
    | LayoutTypes.LAYOUT_TWO_COLUMN
    | LayoutTypes.LAYOUT_DETACHED
    | LayoutTypes.LAYOUT_HORIZONTAL;
  layoutTheme: LayoutTheme.THEME_LIGHT | LayoutTheme.THEME_DARK;
  layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID | LayoutWidth.LAYOUT_WIDTH_BOXED;
  menuPosition:
    | MenuPositions.MENU_POSITION_FIXED
    | MenuPositions.MENU_POSITION_SCROLLABLE;
  leftSideBarTheme:
    | SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT
    | SideBarTheme.LEFT_SIDEBAR_THEME_DARK
    | SideBarTheme.LEFT_SIDEBAR_THEME_BRAND
    | SideBarTheme.LEFT_SIDEBAR_THEME_GRADIENT;
  leftSideBarType:
    | SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT
    | SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED
    | SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT;
  showSidebarUserInfo: boolean;
  topbarTheme:
    | TopbarTheme.TOPBAR_THEME_LIGHT
    | TopbarTheme.TOPBAR_THEME_DARK
    | TopbarTheme.TOPBAR_THEME_BRAND;
  isOpenRightSideBar: boolean;
  changeShowTitlePages: TMenu[];
}

export { LayoutActionTypes };
