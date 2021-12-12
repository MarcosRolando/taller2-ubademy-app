import React from "react";
import { View } from "react-native";
import { Button, Dialog, HelperText, Paragraph, Portal, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { postAddCollaborator } from "../../../scripts/course";

const ADD_PLACEHOLDER = "Enter the collarator's email"

const AddCollaborator = ({courseId, showAddCollaborator, setShowAddCollaborator}: any) => {
  const [collaboratorEmail, setCollaboratorEmail] = React.useState("");
  const hideDialog = () => setShowAddCollaborator(false);

  async function addCollaborator() {
    try {
      const res = await postAddCollaborator(courseId, collaboratorEmail);
      setCollaboratorEmail("");
      setShowAddCollaborator(false);
    } catch (error) {
      alert(error);
    }
  }

  function closeDialog() {
    setCollaboratorEmail("");
    setShowAddCollaborator(false);
  }

  const hasErrors = () => {
    return collaboratorEmail === "" ||
    !collaboratorEmail.includes('@');
  };

  return (
    <Portal>
      <Dialog visible={showAddCollaborator} onDismiss={hideDialog}>
        <Dialog.Content>
          
          <TextInput
            placeholder={ADD_PLACEHOLDER}
            multiline={true}
            onChangeText={(value) => setCollaboratorEmail(value)}
            value={collaboratorEmail}
          >
          </TextInput>

          <HelperText type="error" visible={hasErrors()}>
            Email address is invalid
          </HelperText>

          <View>

            <Button
              disabled={hasErrors()}
              onPress={() => addCollaborator()}
            >
              Add
            </Button>

            <Button
              onPress={() => closeDialog()}
            >
              Cancel
            </Button>

          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

export default AddCollaborator;