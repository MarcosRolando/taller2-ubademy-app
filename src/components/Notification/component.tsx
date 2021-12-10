import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button, View } from 'react-native'

export const Notification = ({ visible, setVisible, message }: any) => {
  return (
    <View>
      <Button
        title="Error"
        onPress={() => {
          setVisible(false);
        }}
      />
      <Dialog
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
      >
        <DialogContent>
          {message}
        </DialogContent>
      </Dialog>
    </View>
  );
}
