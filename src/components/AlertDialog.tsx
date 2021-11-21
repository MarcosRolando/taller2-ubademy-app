import React from 'react';
import {
    Button,
    Dialog,
    Portal,
    Text,
} from 'react-native-paper';

const AlertDialog = (props: any) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={hideDialog}>
                <Dialog.Title>{props.title}</Dialog.Title>
                    <Dialog.Content>
                        <Text>{props.text}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>props.buttonText</Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default AlertDialog;