import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import colors from "./colors";

const styles = StyleSheet.create({
    textInput: {
        paddingBottom: hp(1),
    },
    button: {
        marginVertical: hp(1),
        marginHorizontal: wp(8)
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: hp(15),
        paddingHorizontal: wp(15)
      },
    textInputWrong: {
        paddingBottom: hp(1),
        borderColor: colors.error,
        color: colors.error
    }
});

export default styles;