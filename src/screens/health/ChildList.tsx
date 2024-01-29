import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ParentContext} from '../../utils/context';

type EventType = {
  avatar: ImageSourcePropType;
  name: string;
  selected: boolean;
};
// type SelectEvent = {
//   avatar: ImageSourcePropType;
//   name: string;
//   selected: boolean,
//   prevState: null
// };

export default function ChildList(props: any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route: any = useRoute();
  const {state, dispatch}: any = useContext(ParentContext);
  let obj: any[] = [];
  state.main.profile.students.map((item: any, index: number) => {
    obj.push({
      id: item.person.id,
      name: item.name,
      imageUrl: item.avatarUrl,
      selected: false,
    });
  });

  const [StdArr, setStdArr]: any[] = React.useState(obj);
  return (
    <ScrollView className="bg-gray-100 p-8 space-y-4">
      {StdArr.length > 0 &&
        StdArr.map((item: any, index: number) => (
          <Pressable
            onPress={() => {
              setStdArr((prev: any) => {
                prev[index].selected = !prev[index].selected;
                return [...prev];
              });
            }}
            style={{elevation: 3}}
            className={`${item.selected ? 'border-4' : 'border-2'} ${
              item.selected ? 'border-red-800' : 'border-gray-200'
            } rounded-2xl overflow-hidden relative m-8 flex justify-start items-center h-[220px]`}
            key={index}>
            <View
              className={`${
                item.selected ? 'block' : 'hidden'
              } absolute top-2  right-2 bg-[#F04F3E] p-[2px] rounded-full z-10`}>
              <MaterialCommunityIcons
                name="check-bold"
                size={15}
                color="white"
              />
            </View>
            <Image src={item.imageUrl} className="w-full h-full rounded-t-xl" />
            <View className="bg-white absolute bottom-0 w-full rounded-b-xl flex items-center">
              <Text className="text-[16px] font-[700] text-[#001D6C]">
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}

      <TouchableOpacity
        className="bg-[#001D6C] w-full rounded-lg py-3 mt-[36px]"
        onPress={() =>
          navigation.navigate(route.params.next, {stdArr: StdArr})
        }>
        <Text className="text-white text-center font-bold">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
