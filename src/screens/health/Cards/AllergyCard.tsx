import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import medicationAPI from '../../../api/medication';

const AllergyCard = ({
  item,
  setShowBottomSheetCurrent,
  showBottomSheetCurrent,
  setCurrentItem,
  setStdArr,
  setStudentId,
}: any) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View
      style={{
        elevation: 3,
        shadowColor: '#000', // Shadow color
        shadowOffset: {width: 0, height: 2}, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 2, // Shadow radius
      }}
      className="flex flex-col border bg-white border-gray-300 rounded-2xl m-2 p-2 overflow-hidden">
      <View className="flex flex-row justify-start items-start h-[128px] w-full">
        <View className="h-[64px] w-[64px] m-2 rounded-full items-center justify-center text-center  px-1 py-1 bg-[#D4DEEC]">
          <Image
            source={require('../../../assets/images/allergy.png')}
            resizeMode="contain"
            className="w-9 py-1 px-1 z-40"
          />
        </View>
        <View className="flex flex-row h-full flex-grow justify-end">
          <View className="h-full flex-grow flex flex-col justify-start p-2">
            <Text className="text-lg text-[#001D6C] font-semibold">
              Allergies
            </Text>
            <Text className="text-[#737373] text-[10px]">
              Submitted by Kyle’s Mom Name
            </Text>
            <Text className="text-[#737373] text-[10px]">
              26 Feb 2023, 2:45PM
            </Text>
            <View className="bg-yellow-400 rounded-full mt-1 px-2 py-0.5 w-12 flex items-center">
              <Text className="text-white text-[12px]">Sent</Text>
            </View>
            <Text className="text-[#737373] mt-1 text-[12px]">
              Note: <Text className="text-black">{item?.remarks}</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setStudentId(item.studentId);
              setCurrentItem(item);
              setShowBottomSheetCurrent(!showBottomSheetCurrent);
              // medicationAPI.deleteAllergy({
              //   studentId: item.studentId,
              // });
            }}
            className="mr-2 mt-3">
            <Entypo
              className=""
              name="dots-three-vertical"
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
        className="flex-2 flex-row gap-4  ">
        {item?.allergy.length > 0 &&
          item?.allergy.map((items: any, indexs: number) => {
            return (
              // <View className="flex-row gap-x-2 mx-2">
              <View
                key={indexs + 5}
                style={{
                  elevation: 3,
                  shadowColor: '#000', // Shadow color
                  shadowOffset: {width: 0, height: 2}, // Shadow offset
                  shadowOpacity: 0.2, // Shadow opacity
                  shadowRadius: 2, // Shadow radius
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
                className="flex flex-row justify-center items-center border-gray-300 rounded-2xl p-2  gap-x-1">
                <View className="h-[52px] w-[52px] rounded-full">
                  <Image
                    className="w-full h-full"
                    source={
                      items.iconUrl
                        ? {uri: items.iconUrl}
                        : require('../../../assets/images/seashell.png')
                    }
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-row w-20">
                  <Text className="text-[#001D6C] text-lg font-semibold flex flex-col justify-center items-center">
                    {items?.name}{' '}
                  </Text>
                </View>
              </View>
              // </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default AllergyCard;
