import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const KeyboardDismiss = ({ children }: { children: JSX.Element }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismiss;
