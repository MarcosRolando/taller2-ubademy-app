import React from "react";
import { View } from "react-native";
import { Card, Paragraph, Subheading, Title } from "react-native-paper";
import styles from "../../styling/styles";
import colors from "../../styling/colors";

const BasicInfo = () => {

  return (
    <View>

      <Title style={styles.profileTitle}>
        Titulo del Curso
      </Title>

      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>

      <Card>
        <Card.Cover
        source={require('../../images/example.jpg')}
        resizeMode={'contain'}
        style={{backgroundColor: colors.background}}/>
      </Card>

      <Subheading>
        FREE
      </Subheading>

    </View>
  )
}

export default BasicInfo;