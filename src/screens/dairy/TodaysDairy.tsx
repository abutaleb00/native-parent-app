import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {DatePickerModal} from 'react-native-paper-dates';
import {format} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import generalAPI from '../../api/general';
import {useRoute, useIsFocused,useNavigation} from '@react-navigation/native';
import {CurrentImageURL} from '../../utils/context';
const napImg = require('../../assets/images/menuIcon/nap.png');
const studyImg = require('../../assets/images/menuIcon/study.png');
const pottyImg = require('../../assets/images/menuIcon/potty.png');
const foodImg = require('../../assets/images/menuIcon/food.png');
const TodaysDiary = ({StudentId, KlassId, currentImageURL}: any) => {
  const route: any = useRoute();
  const navigation:any = useNavigation()
  const {state_, dispatch_}: any = useContext(CurrentImageURL);
  const isFocused = useIsFocused();
const [refreshing,setRefreshing] = useState(false)
  const windowWidth = Math.floor(Dimensions.get('window').width) + 'px';
  const [classId, setClassId] = useState<number>(KlassId ? KlassId : 3);
  const [studentId, setStudentId] = useState<number>(StudentId ? StudentId : 8);
  const [date, setDate] = useState(new Date());
  const [resposeMessage, setResposeMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const onDismiss = useCallback(() => {
    setOpenDate(false);
  }, [setOpenDate]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTimelineData();
  }, []);
  const onConfirm = useCallback(
    (params: any) => {
      setOpenDate(false);
      setDate(params.date);
    },
    [setOpenDate, setDate],
  );
  const showDialog = () => setVisible(true);
  useEffect(() => {
    getTimelineData();
  }, [date, classId, studentId]);

  const getTimelineData = async () => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    try {
      let res = await generalAPI.getTimeline(formattedDate, classId, studentId);
      if (res.success) {
        setTimelineData(res.data);
        setRefreshing(false);
      }
    } catch (error) {
      if (error) {
        setRefreshing(false);
        setResposeMessage(error.toString());
        setIsError(true);
        showDialog();
      }
    }
  };
  useEffect(() => {
    if (isFocused) {
      dispatch_({
        type: 'UPDATE_VALUE',
        payload: {currentImageURL: currentImageURL},
      });
    }
    //
  }, []);
  const Timeline = () => {
    const timelineData1 = [
      {
        icon: require('../../assets/images/menuIcon/nap.png'),
        title: 'Nap Time',
        time: '7:30 am',
        teacherName: 'Teacher Sara',
        teacherAvatar: require('../../assets/images/teacher01.png'),
        images: [
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
        ],
        post: 'ZZzzzzzzz Nappy Time Sleepy time kids',
      },
      {
        icon: require('../../assets/images/menuIcon/study.png'),
        title: 'Learning',
        time: '9:30 am',
        teacherName: 'Teacher Sara',
        teacherAvatar: require('../../assets/images/teacher01.png'),
        images: [
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
        ],
        post: 'Class learn about Animals and the alphet! Good Job everyone! >:(',
      },
      {
        icon: require('../../assets/images/menuIcon/food.png'),
        title: 'Eating',
        time: '12:30 pm',
        teacherName: 'Teacher Sara',
        teacherAvatar: require('../../assets/images/teacher01.png'),
        images: [
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
        ],
        post: 'Food: Spaghetti. Didn’t want to eat!!! Bad Student >:(',
      },
      {
        icon: require('../../assets/images/menuIcon/potty.png'),
        title: 'Hygiene',
        time: '12:30 am',
        teacherName: 'Teacher Sara',
        teacherAvatar: require('../../assets/images/teacher01.png'),
        images: [
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
        ],
        post: 'Kyle did great in class!',
      },
      {
        icon: require('../../assets/images/menuIcon/asses.png'),
        title: 'Daily Assessment',
        time: '9:30 pm',
        teacherName: 'Teacher Sara',
        teacherAvatar: require('../../assets/images/teacher01.png'),
        images: [
          {
            imageUrl: require('../../assets/images/dairy01.png'),
          },
        ],
        post: 'ZZzzzzzzz Nappy Time Sleepy time kids',
      },
    ];
    return (
      <View style={{marginHorizontal: 20}}>
        <View style={{marginVertical: 30, marginRight: 20}}>
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
              placeholder="Choose A Date"
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
          <Text className="z-50 absolute -top-4 rounded-xl bg-white w-10 text-center ml-3">
            Date
          </Text>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openDate}
            onDismiss={onDismiss}
            date={date}
            onConfirm={onConfirm}
          />
        </View>
        <View className='h-full'>
        <ScrollView  
       
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {timelineData.length > 0 ? (
          timelineData.map((item: any, index_) => (
            <View key={index_}>
              <View style={{flexDirection: 'row'}} className="iteams-center">
                <Image
                  style={{
                    height: 70,
                    width: 70,
                  }}
                  source={
                    item.type === 'Food'
                      ? foodImg
                      : item.type === 'Potty'
                      ? pottyImg
                      : item.type === 'Nap'
                      ? napImg
                      : studyImg
                  }
                />
                <View className="flex-1 justify-normal align-top">
                  <Text className="pl-2 mt-4" style={styles.subtitle}>
                    {item.type}
                  </Text>
                  <Text className="mt-1 pl-2 text-[#969696] text-xs">
                    {format(new Date(item.timestamp), 'hh-mm a')}
                  </Text>
                </View>
              </View>
              <View className="flex-row">
                <View style={{width: 70, marginVertical: 4}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      // borderLeftWidth: 1,
                      // height: '30%',
                      backgroundColor: '#CACACA',
                      width: 2,
                      flex: index_ === timelineData.length - 1 ? 0 : 1,
                    }}
                  />
                </View>

                <View style={{flex: 1, marginLeft: 20}}>
                  <View className="w-[97%] rounded-xl h-[146px] flex flex-row overflow-hidden">
                    {item.mediaUrls.map((item_: any, index: number) => {
                      return (
                        <View key={index}>
                          <TouchableOpacity
                          onPress={()=>navigation.navigate('PhotoViewer',{data:item.mediaUrls})}
                            key={index}
                            className={`w-full rounded-xl`}>
                            <Image
                              key={index}
                              src={item_}
                              className={`${
                                item?.mediaUrls?.length > 1 && index === 0
                                  ? `w-[177px] h-[146px]`
                                  : index === 1
                                  ? 'w-[97%] h-[74px] ml-1'
                                  : 'w-full'
                              } rounded-xl `}
                            />
                          </TouchableOpacity>
                          {item?.mediaUrls.length > 1 ? (
                            <TouchableOpacity className="w-[91px] h-[70px] ml-1 bg-gray-200 rounded-xl mt-1 flex justify-center items-center">
                              <Text className="text-blue-900 font-bold">
                                {'+' + (item?.mediaUrls.length - 2)}
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      );
                    })}
                  </View>
                  <View className="flex-row bg-[#F6F6F6] rounded-lg mt-1 mr-1">
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginTop: 10,
                      }}
                      source={
                        item.teachersAvatarUrl !== ''
                          ? item.teachersAvatarUrl
                          : require('../../assets/images/teacher01.png')
                      }
                    />
                    <View style={{width: '95%'}}>
                      <Text className="pl-2 mt-1 text-[#001D6C] font-semibold text-sm">
                        {item.teachersName}
                      </Text>
                      <Text
                        className="pl-2 break-words mr-1 pr-1"
                        style={{fontSize: 11}}>
                        {item.comment}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className="flex justify-center items-center gap-2 h-[400px]">
            <Image
              className="opacity-70"
              source={require('../../assets/images/Group.png')}
            />
            <Text>There's no diary entry yet.</Text>
          </View>

        )}
        </ScrollView>
      </View>
      </View>
    );
  };
  return (
    <View className="mt-3">
      <Timeline />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#001D6C',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 15,
  },
  subtitle: {
    color: '#001D6C',
    fontSize: 16,
    fontWeight: '600',

    marginRight: 20,
    // alignSelf: 'center',
  },
});

export default TodaysDiary;