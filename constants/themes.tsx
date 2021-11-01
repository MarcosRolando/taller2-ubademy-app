import {
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import colors from "./colors";

const themes = {
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
            border: colors.error
        },
    }
}

export default themes;