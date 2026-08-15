/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  WHITE: "#FFFFFF",
  BLACK: "#1A1A1A",

  BLUE: "#177fffff",             // Primary blue
  GREY: "#707070d2",             // Medium grey for placeholders/icons
  DARKBLUE: "#1E3A8A",         // Rich navy blue
  TRANSPARENTBLUE: "rgba(37, 99, 235, 0.15)",

  LIGHTGREY: "#F1F5F9",        // Soft page background
  DARKGREY: "#475569",         // Secondary text

  GREEN: "#21cb60ff",            // Success
  YELLOW: "#372d15ff",           // Warning
  RED: "#df6c5c",              // Error/Delete
  VIOLET: "#506396",           // Accent
  DARKVIOLET: "#3b4c7b", 

  LIGHTBLUE: "#60A5FA",        // Light blue accent
  DARKERBLUE: "#0F172A",       // Almost black navy

  INK: "#131A2B",
  INK_2: "#1D2740",
  CHALK: "#f6f6f6ff",
  WHISTLE: "#e1b858",
  TURF: "#2F8F5B",
  COURT_RED: "#cf5442",
  HARDWOOD: "#FDD066",
  SKY: "#60a5fa",
  

  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
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
