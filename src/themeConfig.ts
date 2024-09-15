import { theme, ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#148CFB',
    colorTextBase: '#323a46',
    colorText: '#323a46',
    borderRadiusXS: 2,
    borderRadiusSM: 3,
    borderRadius: 4,
    borderRadiusLG: 6,
    fontSize: 12,
    fontFamily:
      "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI','Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
  },

  components: {
    Button: {
      algorithm: true,
    },
    Input: {
      algorithm: true,
    },
  },
};
export default themeConfig;
