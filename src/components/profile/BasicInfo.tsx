import React from 'react';
import {View} from 'react-native';
import {List, Subheading} from 'react-native-paper';
import styles from '../../constants/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope, faGlobe} from '@fortawesome/free-solid-svg-icons';

const BasicInfo = ({email, location}: any) => {
  return (
    <View >
      <Subheading style={styles.profileSubtitle}>
          Basic Info
      </Subheading>
      <List.Item
        title={email}
        description="Email"
        left={(props) => <List.Icon {...props} icon={({size, color}) => (
          <FontAwesomeIcon color={color} size={size} icon={ faEnvelope } />
        )} />}
      />
      <List.Item
        title={location}
        description="Location"
        left={(props) => <List.Icon {...props} icon={({size, color}) => (
          <FontAwesomeIcon color={color} size={size} icon={ faGlobe } />
        )} />}
      />
    </View>
  );
};

export default BasicInfo;
