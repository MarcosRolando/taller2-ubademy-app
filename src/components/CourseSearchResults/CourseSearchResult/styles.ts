import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  CourseSearchResult: {
    marginVertical: hp(3),
    marginHorizontal: wp(5),
    backgroundColor: '#222',
    borderRadius: 10,
  },
  CourseImage: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    borderRadius: 10,
  },
  CourseTitle: {
    color: colors.primary,
    fontSize: 22,
    marginLeft: wp(3),
    marginVertical: hp(1),
  },
  SubTypeText: {
    position: 'relative', 
    left: wp(58),
    color: 'white',
    fontSize: 20,
    bottom: hp(3),
    backgroundColor: colors.secondary,
    maxWidth: wp(30),
    borderRadius: 5,
    paddingHorizontal: 15,
    textAlign:"center"
  },
  TouchableHighlight: {
    borderRadius: 10,
  }
});
