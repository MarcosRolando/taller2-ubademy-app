import React from 'react';
import {View} from 'react-native';
import {List, Subheading} from 'react-native-paper';
import styles from '../../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAt, faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon color={color} size={size} icon={ faAt } />
        )} />}
      />
      <List.Item
        title={location}
        description="Location"
        left={(props) => <List.Icon {...props} icon={({size, color}) => (
          <FontAwesomeIcon color={color} size={size} icon={ faGlobeAmericas } />
        )} />}
      />
    </View>
  );
};

export default BasicInfo;
