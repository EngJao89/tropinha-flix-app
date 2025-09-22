/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  white: '#FFFFFF',
  blue_light: '#8FB2F5',

  gray_900: '#13131A',
  gray_800: '#16161F',
  gray_700: '#1C1C27',
  gray_600: '#22222F',
  gray_500: '#3B3B54',
  gray_400: '#7F7F98',
  gray_300: '#ABABC4',
  gray_200: '#BFBFD4',
  gray_100: '#FAFAFA',

  green_1: '#F7FFF9',
  green_2: '#528F33',

  red_100: '#E03F50',
  red_200: '#B83341',

  secondary_400: '#93797B',
  secondary_500: '#7A6769',
  secondary_900: '#572D31',
};

export const Fonts_Sizes = {
  XS: 12,
  SM: 14,
  MD: 18,
  LG: 24,
  XL: 30,
  XXL: 40,
  EXL: 48,

  TAG: 10,
  BUTTON: 14,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
