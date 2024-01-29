import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {CurrentImageURL} from '../utils/context';
export default function UserProfilePic() {
  const {state_, dispatch}: any = React.useContext(CurrentImageURL);
  console.log(state_.currentImageURL);
  return (
    <TouchableWithoutFeedback>
      <Animated.Image
        style={{
          height: 90,
          width: 90,
          resizeMode: 'cover',
          bottom: 40,
          overflow: 'hidden',
          borderRadius: 400 / 2,
          borderWidth: 2,
          borderColor: 'red',
        }}
        source={
          state_.currentImageURL !== null 
            ?  state_.currentImageURL.currentImageURL !== undefined ? {uri: state_.currentImageURL.currentImageURL}
            : require('../assets/images/defaultAvatar.png') : require('../assets/images/defaultAvatar.png')
        }
      />
    </TouchableWithoutFeedback>
  );
}
