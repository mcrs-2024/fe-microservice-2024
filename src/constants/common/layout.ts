/* Layout types and other constants */

export enum LayoutTypes {
  LAYOUT_VERTICAL = 'vertical',
  LAYOUT_HORIZONTAL = 'horizontal',
  LAYOUT_DETACHED = 'detached',
  LAYOUT_TWO_COLUMN = 'two-column',
}

export enum LayoutTheme {
  THEME_LIGHT = 'light',
  THEME_DARK = 'dark',
}

export enum LayoutWidth {
  LAYOUT_WIDTH_FLUID = 'fluid',
  LAYOUT_WIDTH_BOXED = 'boxed',
}

export enum MenuPositions {
  MENU_POSITION_FIXED = 'fixed',
  MENU_POSITION_SCROLLABLE = 'scrollable',
}

export enum SideBarTheme {
  LEFT_SIDEBAR_THEME_LIGHT = 'light',
  LEFT_SIDEBAR_THEME_DARK = 'dark',
  LEFT_SIDEBAR_THEME_BRAND = 'brand',
  LEFT_SIDEBAR_THEME_GRADIENT = 'gradient',
}

export enum SideBarTypes {
  LEFT_SIDEBAR_TYPE_DEFAULT = 'default',
  LEFT_SIDEBAR_TYPE_CONDENSED = 'condensed',
  LEFT_SIDEBAR_TYPE_COMPACT = 'compact',
}

export enum TopbarTheme {
  TOPBAR_THEME_LIGHT = 'light',
  TOPBAR_THEME_DARK = 'dark',
  TOPBAR_THEME_BRAND = 'brand',
}
