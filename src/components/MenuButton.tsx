import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Easing} from 'react-native-reanimated';

export default function MenuButton() {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [isFinished, setIsFinished] = useState(false);

  const rotate = () => {
    // First set up animation

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start(({finished}) => {
      if (finished) {
        setSpinValue(new Animated.Value(0));
        setIsFinished(!isFinished);
      }
    });
  };
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: isFinished ? ['360deg', '0deg'] : ['0deg', '360deg'],
  });

  const menuItem = [
    {
      icon: require('../assets/images/menuIcon/nap.png'),
      navigate: 'Nap',
      style: {
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.02,
        left: 80,
      },
    },
    {
      icon: require('../assets/images/menuIcon/study.png'),
      navigate: 'Study',
      style: {
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.16,
        left: 120,
      },
    },
    {
      icon: require('../assets/images/menuIcon/food.png'),
      navigate: 'Food',
      style: {
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.24,
        alignSelf: 'center',
        // left: Dimensions.get('window').width / 2.15,
      },
    },
    {
      icon: require('../assets/images/menuIcon/potty.png'),
      navigate: 'Potty',
      style: {
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.16,
        right: 120,
      },
    },
    {
      icon: require('../assets/images/menuIcon/asses.png'),
      navigate: 'Asses',
      style: {
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.02,
        right: 80,
      },
    },
  ];
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          rotate();
        }}>
        <Animated.Image
          style={{
            height: 100,
            width: 100,
            resizeMode: 'contain',
            bottom: 40,
            transform: [{rotate: spin}],
          }}
          source={require('../assets/images/actionButton.png')}
        />
      </TouchableWithoutFeedback>

      <View
        style={{
          flex: 1,
          backgroundColor: 'pink',
          position: 'absolute',
          width: '100%',
          //   bottom: 50,
        }}>
        {isFinished &&
          menuItem.map((item: any, index) => (
            <View style={[item.style]} key={index}>
              <Image
                style={{
                  height: 65,
                  width: 65,
                  resizeMode: 'contain',
                }}
                source={item.icon}
              />
            </View>
          ))}
      </View>
    </>
  );
}
