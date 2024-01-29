import {
  Image,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {DatePickerModal} from 'react-native-paper-dates';
import {format} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import generalAPI from '../../api/general';

const DailyAttendance = () => {
  const [personId, setPersonId] = useState<number | null>(19);
  const [date, setDate] = useState(new Date());
  const [resposeMessage, setResposeMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [plaData, setPlaData] = useState<any | null>(null);
  const [daysData, setDaysData] = useState<number | null>(0);
  const onDismiss = useCallback(() => {
    setOpenDate(false);
  }, [setOpenDate]);
  const [refreshing, setRefreshing]:any = useState(false);
  const onConfirm = useCallback(
    (params: any) => {
      setOpenDate(false);
      setDate(params.date);
    },
    [setOpenDate, setDate],
  );
  const showDialog = () => setVisible(true);
  useEffect(() => {
    getAttendance();
  }, [date, personId]);

  const getAttendance = async () => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    try {
      let res = await generalAPI.getAttendance(formattedDate, personId);
      if (res.success) {
        setRefreshing(false)
        setAttendanceData(res.data?.items);
        setPlaData(res.data?.pla);
        setDaysData(res.data?.days);
      }
    } catch (error) {
      console.log('error in appreciation', error);
      if (error) {
        setRefreshing(false)
        setResposeMessage(error.toString());
        setIsError(true);
        showDialog();
      }
    }
  };
  const onRefresh:any = useCallback(() => {
    setRefreshing(true);
    getAttendance();
  }, []);
  const Timeline = () => {
    return (
      <ScrollView style={{marginHorizontal: 20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        <Text className="text-black text-base mt-3">Score</Text>
        <View className="flex-row justify-around items-center">
          <View className="flex justify-center items-center">
            <Image
              source={require('../../assets/images/present.png')}
              resizeMode="cover"
            />
            <Text className="text-[#76D2CF] text-center text-base">
              {plaData?.present}% Present
            </Text>
          </View>
          <View className="flex justify-center items-center">
            <Image
              source={require('../../assets/images/leave.png')}
              resizeMode="cover"
            />
            <Text className="text-[#EABF70] text-center text-base">
              {plaData?.leave}% Leave
            </Text>
          </View>
          <View className="flex justify-center items-center">
            <Image
              source={require('../../assets/images/absent.png')}
              resizeMode="cover"
            />
            <Text className="text-[#EF868D] text-center text-base">
              {plaData?.absent}% Absent
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 30, marginRight: 20}}>
          <Text className="z-50 bg-white w-10 text-center ml-3" style={{}}>
            Date
          </Text>
          <View className="w-full flex flex-row -mt-2 z-40">
            <TextInput
              onPressIn={() => setOpenDate(true)}
              style={{
                marginHorizontal: 2,
                borderRadius: 11,
                fontSize: 15,
                height: 50,
                padding: Platform.OS === 'ios' ? 15 : 10,
                width: '100%',

                backgroundColor: '#FFF',
                borderColor: '#001D6C80',
                borderWidth: 1,
                color: 'black',
              }}
              placeholderTextColor={'#8E8E8E'}
              readOnly
              placeholder="08/17/2023"
              value={date ? `${format(new Date(date!), 'dd/MM/yy')}` : ''}
            />
            <TouchableOpacity
              onPress={() => setOpenDate(true)}
              className="bg-red-200 rounded-full py-1 px-1"
              style={{marginLeft: -50, marginTop: 10, marginBottom: 10}}>
              <MaterialCommunityIcons
                name="calendar"
                color="#4A4A4A"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Text className="ml-4 mt-2 text-[#576A9E]">MM/DD/YYYY</Text>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openDate}
            onDismiss={onDismiss}
            date={date}
            onConfirm={e => {
              onConfirm(e);
            }}
          />
        </View>
        <View className="flex-row mb-4 font-semibold">
          <Text className="text-base text-[#5C81E5]" style={{width: '26%'}}>
            Last {daysData} days
          </Text>
          <View
            className="border-[#C6C6C6] mt-3"
            style={{borderTopWidth: 1, width: '74%'}}></View>
        </View>
        <View className="flex-row justify-between bg-[#F5F5F5] py-2 px-1">
          <Text className="text-md text-[#6F6F6F] mr-5">Date</Text>
          <Text className="text-md text-[#6F6F6F] ml-7">Time In</Text>
          <Text className="text-md text-[#6F6F6F]">Time Out</Text>
          <Text className="text-md text-[#6F6F6F]">Status</Text>
        </View>
        {attendanceData?.map((item: any, index) => (
          <View
            className="flex-row justify-between py-2 px-1 border-[#C6C6C6]"
            key={index}
            style={{borderBottomWidth: 1}}>
            <Text className="text-md text-[#6F6F6F]">{item.date}</Text>
            <Text className="text-md text-[#6F6F6F]">
              {item?.timeIn !== '' && item?.timeIn !== undefined
                ? format(new Date(item?.timeIn), 'hh:mm aaa')
                : '-'}
            </Text>
            <Text className="text-md text-[#6F6F6F]">
              {item?.timeOut !== '' && item?.timeOut !== undefined
                ? format(new Date(item?.timeOut), 'hh:mm a')
                : '-'}
            </Text>
            <Text
              className={
                item.status === 'Absent'
                  ? 'text-md text-[#EF868D] font-bold'
                  : item.status === 'Leave'
                  ? 'text-md text-[#EDB86C] font-bold'
                  : 'text-md text-[#76D2CF] font-bold'
              }>
              {item.status}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };
  return (
    <View className="mt-3">
      <Timeline />
    </View>
  );
};

export default DailyAttendance;
