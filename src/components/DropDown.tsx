import React, { FC, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated, Easing, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string;
    items: string[];
  }

const Dropdown: FC<Props> = ({ label, items }) => {
  const [visible, setVisible] = useState(false);
  const animatedIconRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedIconRotation, {
      duration: 100,
      easing: Easing.linear,
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdown} className='w-[300px] border rounded-xl z-50'>
          {items.map((item, index) => (
            <Text key={index} style={styles.dropdownItem}>
              {item}
            </Text>
          ))}
        </View>
      );
    }
  };;

  const iconRotation = animatedIconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={styles.buttonText}>{label}</Text>
      <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
        <Ionicons name='chevron-down' size={20}/>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 1,
    borderRadius: 10,
    borderWidth:1
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
  },
  dropdown: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    top: 50,
    width: '100%',
    backgroundColor: '#fff'
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Dropdown;