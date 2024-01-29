import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function OnboardingOneScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1 justify-center"
        source={require('../../assets/images/onboardingone.png')}
        style={{}}
        resizeMode="stretch">
        <View className="justify-center items-center">
          <Image
            source={require('../../assets/images/slider-1.png')}
            resizeMode="contain"
            className="-mt-2"
          />
          <View className="flex-row justify-center items-center mt-5">
            <View className='bg-[#DE5B48] rounded-full w-2 h-2 mr-2'></View>
            <View className='bg-[#D9D9D9] rounded-full w-2 h-2 mr-2'></View>
            <View className='bg-[#D9D9D9] rounded-full w-2 h-2'></View>
          </View>
          <Text className="font-bold text-2xl mt-5 py-3 text-center text-[#4A4A4A]">
            Window into Your
          </Text>
          <Text className="font-bold text-2xl py-3 -mt-6 text-center text-[#4A4A4A]">
            Child's World!
          </Text>
          <Text className="text-sm mt-2 py-3 text-center text-[#4A4A4A]">
            Take a glimpse to understanding and
          </Text>
          <Text className="text-sm -mt-6 py-3 text-center text-[#4A4A4A]">
            connecting with your child like never before.
          </Text>
          <TouchableOpacity
            className="bg-[#DE5B48] rounded-full my-5"
            onPress={() => navigation.navigate('OnboardingTwo')}>
            <Text className="text-white font-semibold text-center py-2 rounded-full px-8">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
