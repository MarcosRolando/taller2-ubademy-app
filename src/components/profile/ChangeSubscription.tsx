import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Dialog, List, Portal, Title, Subheading } from "react-native-paper";
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styles/colors";
import DropDown from "react-native-paper-dropdown";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { getSubTypes, postModifySub } from "../../scripts/profile";

const data = [{
  label: "Free", value: "Free"
  }, {
  label: "Silver", value: "Silver"
}]

const ChangeSubscription = ({subscription, showChangeSub, setShowChangeSub}: any) => {
  const [showSubsList, setShowSubsList] = React.useState(false);
  const [sub, setSub] = React.useState(subscription);
  const [subList, setSubList] = React.useState([] as Array<{label: string, value: string}>)
  const [showPay, setShowPay] = React.useState(false);
  const hideDialog = () => setShowChangeSub(false);

  useEffect(() => {
    (async () => {
      const types = await getSubTypes();
      const typesAux = [] as Array<{label: string, value: string}>;
      for (let i = 0; i < types.length; i++) {
        typesAux.push({
          label: types[i],
          value: types[i]
        })
      }
      setSubList(typesAux);
      console.log(subList);
    })();
  }, [])

  function closeDialog() {
    setShowChangeSub(false);
  }

  async function changeSub(){
    try {
      await postModifySub(sub);
    } catch (error) {
      alert(error);
    }
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
                <FontAwesomeIcon color={color} size={size} icon={ faStar }  />
              )} />}
            />
          </View>

          <DropDown
            visible={showSubsList}
            placeholder={"Select an exam type"}
            
            mode={"outlined"}
            showDropDown={() => setShowSubsList(true)}
            onDismiss={() => setShowSubsList(false)}
            value={sub}
            setValue={(value : any) => {
              setSub(value);
            }}
            list={subList}
          />

          <Button
            onPress={() => changeSub()}
          >
            Change subscription
          </Button>

          <Button
            onPress={() => closeDialog()}
          >
            Cancel
          </Button>
        </View>
      </Dialog>

      <Dialog visible={showPay} onDismiss={hideDialog}>

        <Button
          onPress={() => closeDialog()}
        >
          Cancel
        </Button>
        
      </Dialog>
    </Portal>
  )
}

export default ChangeSubscription;