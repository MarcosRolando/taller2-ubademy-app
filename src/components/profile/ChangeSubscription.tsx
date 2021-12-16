import React from "react";
import { View } from "react-native";
import { Button, Dialog, List, Portal, Title, Subheading } from "react-native-paper";
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styles/colors";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAt, faGlobeAmericas, faStar} from '@fortawesome/free-solid-svg-icons';

const ChangeSubscription = ({subscription, showChangeSub, setShowChangeSub}: any) => {
  const hideDialog = () => setShowChangeSub(false);

  function closeDialog() {
    setShowChangeSub(false);
  }

  return (
    <Portal>
      <Dialog visible={showChangeSub} onDismiss={hideDialog}>
        <View style={{marginHorizontal: wp(2), marginVertical:wp(2)}}>
          <Title style={{color:colors.primary}}>
            Select a new subscription
          </Title>
          
          <View style={{alignContent:"center"}}>
            <List.Item
              title={"Current subscription: " + subscription}
              left={(props) => <List.Icon {...props} icon={({size, color}) => (
                <FontAwesomeIcon color={color} size={size} icon={ faStar } />
              )} />}
            />
          </View>

          <Button
            onPress={() => closeDialog()}
          >
            Cancel
          </Button>
        </View>
      </Dialog>
    </Portal>
  )
}

export default ChangeSubscription;