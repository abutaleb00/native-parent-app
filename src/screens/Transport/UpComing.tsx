import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {format} from 'date-fns';

export default function UpComing({data_}: any) {
  return (
    <>
      <View className="flex-1 my-2">
        {data_.length > 0 ? (
          data_.map((item: any, index: number) => (
            <View
              style={{
                elevation: 3,
                shadowColor: '#000', // Shadow color
                shadowOffset: {width: 0, height: 2}, // Shadow offset
                shadowOpacity: 0.2, // Shadow opacity
                shadowRadius: 2, // Shadow radius
              }}
              className="flex-row justify-around my-2 border bg-white rounded-2xl border-gray-500 mx-5 py-5 px-2"
              key={index}>
              <View>
                <Text className="text-[#001D6C] text-xs">Drop-Off</Text>
                <Image
                  className="w-12"
                  source={require('../../assets/images/transport.png')}
                  resizeMode="contain"
                />
              </View>
              <View className="">
                <View
                  className="border-[#D1D1D1] border-b-2 pb-2 mb-2"
                  style={{borderBottomWidth: 1}}>
                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#001D6C] font-[500] text-base">
                      {format(item?.date, 'yyyy-MM-dd')}
                    </Text>
                    <Image
                      className="w-8 h-8 rounded-full"
                      source={{uri: item.student?.imageUrl}}
                    />
                  </View>
                  <View
                    className={
                      item?.acknowledgedByStaffId !== null
                        ? 'bg-[#76D2CF] rounded-lg w-20'
                        : 'bg-yellow-400 rounded-lg w-12'
                    }>
                    <Text
                      className="text-center text-white py-1"
                      style={{fontSize: 9}}>
                      {item?.acknowledgedByStaffId === null
                        ? 'Sent'
                        : 'Acknowledged'}
                    </Text>
                  </View>
                </View>
                <Text className="text-[#001D6C] text-sm w-60">
                  {item.address}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <>
            <View className="flex-1 justify-center items-center">
              <Image
                className="w-40"
                source={require('../../assets/images/transport.png')}
                resizeMode="contain"
              />
              <Text className="text-xs text-[#999999] mt-5">
                Click the plus button to request for transportation
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
}
