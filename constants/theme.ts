/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const primaryPurple = "#8B5CF6";
const secondaryOrange = "#FB923C";
const tintColorDark = "#FCD34D";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: primaryPurple,
    accent: secondaryOrange,
    icon: "#6D28D9",
    tabIconDefault: "#6B7280",
    tabIconSelected: primaryPurple,
    button: secondaryOrange,
  },
  dark: {
    text: "#F8FAFC",
    background: "#0F172A",
    tint: primaryPurple,
    accent: secondaryOrange,
    icon: "#A78BFA",
    tabIconDefault: "#94A3B8",
    tabIconSelected: primaryPurple,
    button: secondaryOrange,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
