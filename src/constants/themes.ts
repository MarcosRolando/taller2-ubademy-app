import {
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {DarkTheme} from '@react-navigation/native';
import colors from './colors';


export const UbademyTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: colors.primary,
  },
};

export const NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
  },
};

export const Themes = {
  textInput: {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      primary: colors.primary,
    },
  },
  textInputWrong: {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      primary: colors.error,
      placeholder: colors.error,
      border: colors.error,
    },
  },
};
