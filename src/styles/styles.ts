import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from './colors';

const styles = StyleSheet.create({
  textInput: {
    paddingBottom: hp(1),
  },
  button: {
    marginVertical: hp(1),
    marginHorizontal: wp(8),
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: hp(15),
    paddingHorizontal: wp(15),
  },
  textInputWrong: {
    paddingBottom: hp(1),
    borderColor: colors.error,
    color: colors.error,
  },
  profile: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: wp(5),
  },
  profileImage: {
    paddingTop: hp(2),
    alignItems: 'center',
  },
  profileTitle: {
    paddingTop: hp(2.5),
    justifyContent: 'flex-start',
    fontSize: hp(5),
    color: colors.primary
  },
  profileName: {
    paddingTop: hp(2),
    color: colors.primary,
  },
  profileSubtitle: {
    paddingTop: hp(5),
    fontSize: hp(3),
  },
  hideView: {
    height: 0,
    width: 0,
  },
  fieldView: {
    paddingHorizontal: wp(5)
  },
});

export default styles;
