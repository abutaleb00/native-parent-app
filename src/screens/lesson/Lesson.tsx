import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Lesson = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const imgSrc = props.data.media[0].url;
  const name = props.data.title;
  const goToDetail = () => {
    navigation.navigate('LessonDetailScreen', {...props.data});
  };
  return (
    <TouchableOpacity
      className="w-24  h-36 rounded-r-2xl flex justify-center items-center overflow-hidden"
      onPress={() => {
        goToDetail();
      }}>
      <Image
        source={
          imgSrc
            ? {uri: imgSrc}
            : require('../../assets/images/lesson/Book.png')
        }
        className="absolute w-24 h-36"
      />
      <View
        style={{elevation: 3}}
        className="bg-black flex items-center w-full absolute bottom-0 py-2.5 px-1">
        <Text numberOfLines={1} className="text-white truncate">
          {name}
        </Text>
      </View>

      {props.vidSrc ? (
        <Ionicons name="play-circle" className="" size={30} color={'#fff'} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Lesson;
