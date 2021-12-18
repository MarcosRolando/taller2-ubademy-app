import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Dialog, List, Portal, Title, Subheading, Paragraph } from "react-native-paper";
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../styles/colors";
import DropDown from "react-native-paper-dropdown";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { getSubTypes, postModifySub, postPaySub } from "../../scripts/profile";
import { StyleSheet } from "react-native";

const ChangeSubscription = ({subscription}: any) => {
  const [showSubsList, setShowSubsList] = React.useState(false);
  const [sub, setSub] = React.useState(subscription);
  const [subList, setSubList] = React.useState([] as Array<{label: string, value: string}>)
  const [showPay, setShowPay] = React.useState(false);
  const [payment, setPayment] = React.useState(0);
  const hideDialog = () => setShowPay(false);


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
    })();
  }, [])

  async function changeSub(){
    try {
      const res = await postModifySub(sub);
      if (res.amount_to_pay !== undefined) {
        setShowPay(true);
        setPayment(res.amount_to_pay);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  async function pay() {
    try {
      const res = await postPaySub(sub);
      alert(res.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
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
        placeholder={"Select a new subscription"}
        
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

      <Portal>
        <Dialog visible={showPay} onDismiss={hideDialog}>
          <View style={{marginHorizontal:wp(3)}}>
            <Title style={{color: colors.primary}}>
              Subscription's Payment
            </Title>

            <View style={{alignItems:"center"}}>
            <Paragraph style={{textAlign:"center"}}>
              In order to upgrade your subscription, you need to pay:
            </Paragraph>

            <View style={styles.payment}>
              <Paragraph style={styles.paymentText}>
                $ {payment}
              </Paragraph>
            </View>

            <Paragraph style={{textAlign:"center"}}>
              If you press accept, that amount will be extracted from your user's wallet.
            </Paragraph>

            </View>

            <Button
              onPress={() => pay()}
            >
              Pay
            </Button>

            <Button
              onPress={() => setShowPay(false)}
            >
              Cancel
            </Button>
          </View>
        </Dialog>
      </Portal>
    </View>
  )
}

export default ChangeSubscription;

const styles = StyleSheet.create({
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
})