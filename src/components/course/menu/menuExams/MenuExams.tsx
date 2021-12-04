import React from "react";
import { ScrollView, View } from "react-native";
import { List, Title } from "react-native-paper";
import styles from "../../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const MenuExams = ({id, navigation}: any) => {

  return (
    <ScrollView>

      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        Exams
      </Title>

      <View style={styles.menu}>
        <List.Item
          title={"See course"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={() => console.log("uwu")}
        />

      </View>

    </ScrollView>
  )
}

export default MenuExams;