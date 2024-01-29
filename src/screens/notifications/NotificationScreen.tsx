import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';

export default function AllNotification() {
  const data = [
    {
      title: 'News was added.',
      time: '1 hr ago',
      button: 'View News',
    },
    {
      title: 'Photo was added.',
      time: '1 hr ago',
      button: 'View Gallery',
    },
    {
      title: 'Assessment was added.',
      time: '1 hr ago',
      button: 'View Assessment',
    },
    {
      title: 'Mr. James updated the Attendance.',
      time: '1 hr ago',
      button: 'View Attendance',
    },
  ];
  return (
    <View className="bg-white flex-1">
      <View className="flex-1 mt-5 mx-6 bg-white">
        {data.length > 0 ? (
          data.map((item: any, index) => (
            <View
              key={index}
              className="flex-row border-gray-300 pb-2 mb-4 mt-4"
              style={{borderBottomWidth: 1}}>
              <View className="bg-[#FCE8D6] rounded-full px-2 py-2 h-11 w-11 justify-center items-center">
                <MaterialCommunityIcons
                  name="bell-badge-outline"
                  color="#001D6C"
                  size={24}
                />
              </View>
              <View className="ml-4">
                <Text className="font-semibold text-base">{item.title}</Text>
                <Text className="text-[#0f0b0b] text-sm">{item.time}</Text>
                <Text className="text-[#3695EC] text-xs mb-2">
                  {item.button}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View className="flex-1 justify-center items-center">
            <Image
              className="w-40 -mb-10"
              source={require('../../assets/images/bell-snooze.png')}
              resizeMode="contain"
            />
            <Text className="text-[#2A2A2F] text-center font-semibold text-base -mt-10 mb-3">
              You’re all caught up
            </Text>
            <Text className="text-[#89888F] text-center text-sm">
              Come back later for
            </Text>
            <Text className="text-[#89888F] text-center ftext-sm">
              reminders after some time
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
