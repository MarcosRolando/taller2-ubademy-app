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
    paddingTop: hp(10),
    justifyContent: 'flex-start',
    fontSize: hp(5),
    color: colors.primary
  },
  profileName: {
    paddingTop: hp(2),
    color: colors.primary,
    fontSize: 26,
  },
  profileSubtitle: {
    paddingTop: hp(5),
    fontSize: hp(3),
  },
  hideView: {
    height: 0,
    width: 0,
  },
  viewOnFront: {
    position: "absolute",
    bottom:0,
    alignContent: "center",
    alignItems: 'center',
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingTop: hp(1),
    paddingBottom: hp(1),
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonOnFront: {
    backgroundColor: colors.background,
    borderRadius: 1.5,
    padding:wp(2),
    marginLeft:wp(10)
  },
  fieldView: {
    paddingHorizontal: wp(5)
  },
  menu: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: wp(3)
  },
  searchbar: {
    marginHorizontal: wp(4),
    marginVertical: wp(3),
  },
  screen: {
    marginHorizontal:wp(2)
  },
  payment: {
    backgroundColor: colors.primary,
    borderRadius:wp(2),
    width:wp(50),
    height: hp(5),
    justifyContent: 'center'
  },
  paymentText: {
    fontWeight:"bold",
    alignSelf:"center",
    textAlignVertical:"center"
  }
});

export default styles;
