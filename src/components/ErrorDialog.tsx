import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import ErrorIcon from '../assets/images/error.svg';
import SuccesIcon from '../assets/images/success.svg';

const ErrorDialog = ({
  isError = false,
  visible = false,
  hideDialog,
  content,
}: {
  isError: boolean;
  visible: boolean;
  hideDialog: () => void;
  content: string;
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: 0,
        }}>
        <Dialog.Title>{isError ? <ErrorIcon /> : <SuccesIcon />}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions style={{alignSelf: 'flex-end'}}>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ErrorDialog;
