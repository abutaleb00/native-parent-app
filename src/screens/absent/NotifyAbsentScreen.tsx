import {View, Text, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import absentAPI from '../../api/absent';
import {format} from 'date-fns';

export default function NotifyAbsentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [absentData, setAbsentData]: any[] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      getAbsent();
  }, []);
  useEffect(() => {
    getAbsent();
  }, []);
  const getAbsent = async () => {
    try {
      let res = await absentAPI.getAbsent();
      if (res.success) {
        setAbsentData(res.data);
        setRefreshing(false);
        console.log("res.data", res.data)
      }
    } catch (error) {
      setRefreshing(false);
      console.log('error in appreciation', error);
      // if (error) {
      //   setResposeMessage(error.toString());
      //   setIsError(true);
      //   showDialog();
      // }
    }
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          backgroundColor: 'white',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        {absentData?.length > 0 ? (
          absentData.map((item: any, index: number) => (
            <View
              className="mt-4 rounded-3xl border-gray-300 mx-5 py-5 px-4 border"
              style={{
                elevation: 2,
                shadowColor: '#000', // Shadow color
                shadowOffset: {width: 0, height: 2}, // Shadow offset
                shadowOpacity: 0.2, // Shadow opacity
                shadowRadius: 2, // Shadow radius
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 8,
              }}
              key={index}>
              <View className="flex-row justify-between">
                <View className="flex-row">
                  <View className="w-14 h-14 ">
                    <Image
                      className="w-full h-full rounded-full"
                      src={item.student?.imageUrl}
                    />
                  </View>
                  <View className="ml-4">
                    <Text className="text-[#001D6C] font-[500] text-lg">
                      {item.student?.name}
                    </Text>
                    <View
                      className={
                        item.status === 'Sent'
                          ? 'rounded-xl bg-[#FBC756] px-3 py-1'
                          : 'rounded-xl bg-[#76CA66] px-3 py-1'
                      }
                      style={{paddingVertical: 2}}>
                      <Text className="text-white text-xs text-center">
                        {item?.acknowledgedByStaffId !== null
                          ? 'Acknowledged'
                          : 'Sent'}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    console.log(item);
                    await absentAPI.deleteAbsent({
                      studentId: item.studentId,
                      startDate: format(
                        new Date(item.startDate),
                        'yyyy-MM-dd hh:mm:ss',
                      ),
                    });
                    absentData[index] = null;
                    setAbsentData(absentData);
                  }}>
                  <MaterialCommunityIcons
                    className="right"
                    name="trash-can-outline"
                    color="red"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-row mt-4">
                <MaterialCommunityIcons
                  name="clock-time-three-outline"
                  color="#EABF70"
                  size={28}
                />
                <Text className="text-[#EABF70] font-semibold text-sm ml-2 mt-1">
                  ON LEAVE :{' '}
                </Text>
                <Text className="text-[#001D6C] font-semibold text-sm ml-2 mt-1">
                  {format(new Date(item.startDate), 'dd/MM/yy')} -{' '}
                  {format(new Date(item.endDate), 'dd/MM/yy')}
                </Text>
              </View>
              <View className="mt-3">
                <Text className="text-xs text-black pl-1 mb-1">Reason:</Text>
                <View
                  className="bg-[#D7D7D7] rounded-md border-gray-500 px-2 py-3"
                  style={{borderWidth: 1}}>
                  <Text className="text-sm text-black">{item?.reason}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className="flex-1 justify-center items-center">
            <Image
              className="w-40"
              source={require('../../assets/images/leaf.png')}
              resizeMode="contain"
            />
            <Text className="text-xs text-[#999999] mt-5">
              No leave request yet. Click the plus button to add.
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          elevation: 3,
          shadowColor: '#000', // Shadow color
          shadowOffset: {width: 0, height: 2}, // Shadow offset
          shadowOpacity: 0.2, // Shadow opacity
          shadowRadius: 2, // Shadow radius
          backgroundColor: 'white',
        }}
        className="absolute bottom-10 right-5 rounded-full"
        onPress={() => navigation.navigate('AbsentChildList')}>
        <View className="w-12 h-12 rounded-full text-center items-center justify-center bg-[#001D6C] ">
          <MaterialCommunityIcons name="plus" color="#ffffff" size={30} />
        </View>
      </TouchableOpacity>
    </>
  );
}
