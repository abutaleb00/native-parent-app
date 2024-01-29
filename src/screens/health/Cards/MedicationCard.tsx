import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {format} from 'date-fns';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import medicationAPI from '../../../api/medication';
const MedicationCard = ({
  index,
  setCloseDate,
  setOpenDate,
  item,
  setShowBottomSheetCurrent,
  showBottomSheetCurrent,
  setMedicationId,
  setStdArr,
  setCurrentItem,
}: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <View>
      <View
        style={{
          elevation: 3,
          shadowColor: '#000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.2, // Shadow opacity
          shadowRadius: 2, // Shadow radius
        }}
        className="flex flex-col border bg-white border-gray-300 rounded-2xl m-2 p-2 overflow-hidden">
        <View className="flex flex-row justify-start items-start h-[100px] w-full">
          <View className="h-[64px] w-[64px] m-2 rounded-full items-center justify-center text-center  px-1 py-1 bg-[#D4DEEC]">
            <Image
              source={require('../../../assets/images/addmedi.png')}
              resizeMode="contain"
              className="w-9 py-1 px-1 z-40"
            />
          </View>
          <View className="flex flex-row h-full flex-grow justify-end">
            <View className="h-full gap-1 flex-grow flex flex-col justify-start p-2">
              <Text className="text-lg text-[#001D6C] font-semibold">
                Medication
              </Text>
              <Text className="text-[#001449] font-semibold text-[12px]">
                Duration: {format(new Date(item.startDate), 'yyyy-MM-dd')} -{' '}
                {item.endDate !== null
                  ? format(new Date(item.endDate), 'yyyy-MM-dd')
                  : item.endDate}
              </Text>
              <View className="bg-yellow-400 rounded-full px-2 py-0.5 w-12 flex items-center">
                <Text className="text-white text-[12px]">Sent</Text>
              </View>
            </View>
            <View className="flex flex-col relative">
              <TouchableOpacity
                onPress={() => {
                  console.log('item', item);
                  item.student = {
                    ...item.student,
                    id: item.id,
                    selected: true,
                  };
                  setStdArr([item.student]);
                  setMedicationId(item.id);
                  setCurrentItem(item.medicine);
                  setOpenDate(item.startDate);
                  setCloseDate(item.endDate);
                  setShowBottomSheetCurrent(!showBottomSheetCurrent);
                }}
                className="mr-2 mt-3">
                <Entypo
                  className=""
                  name="dots-three-vertical"
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
              <View
                className={`w-[72px] h-16 border p-2 border-gray-200 absolute right-0 -bottom-2 rounded-xl ${
                  showDropdown ? 'block' : 'hidden'
                }`}>
                <TouchableOpacity onPress={() => {}}>
                  <Text className="text-black mb-1">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await medicationAPI.deleteMedication({
                        id: item.id,
                      });
                    } catch {
                      (e: any) => console.log(e);
                    }
                  }}>
                  <Text className="text-black">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Text className="text-[#001755] font-semibold px-2 py-2">
          {format(new Date(), "'Today,' do MMM yyyy")}
        </Text>
        {item.medicine.length > 0 &&
          item.medicine.map((items: any, indexs: number) => {
            return (
              <View
                key={indexs}
                style={{
                  elevation: 3,
                  shadowColor: '#000', // Shadow color
                  shadowOffset: {width: 0, height: 2}, // Shadow offset
                  shadowOpacity: 0.2, // Shadow opacity
                  shadowRadius: 2, // Shadow radius
                }}
                className="flex flex-row border bg-white rounded-xl my-1 p-2 border-gray-300 flex-grow items-center justify-between">
                <View className="flex flex-col  flex-grow">
                  <View className="flex flex-row flex-grow border-b mx-2 border-gray-400 pb-2">
                    <View className="w-9 h-9 rounded">
                      <Image
                        className="w-full h-full rounded-sm"
                        source={
                          items?.imageUrl
                            ? {uri: items?.imageUrl}
                            : require('../../../assets/images/addmedi.png')
                        }
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-lg text-[#001D6C] font-semibold px-2">
                      {items?.name} | {items?.consumptionMode}
                    </Text>
                  </View>
                  <Text className="text-[12px] text-[#A6A4A4] py-1 mx-2">
                    Remarks:{' '}
                    <Text className="text-black">{items?.remarks}</Text>{' '}
                  </Text>
                </View>
                {items?.givenById === null ? (
                  <MaterialCommunityIcons
                    name="checkbox-blank"
                    size={30}
                    color="#DDDDDD"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="checkbox-marked"
                    size={30}
                    color="#2AB514"
                  />
                )}
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default MedicationCard;
