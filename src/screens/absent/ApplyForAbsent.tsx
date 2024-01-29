import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';
import React, {useState, useCallback} from 'react';
import {DatePickerModal} from 'react-native-paper-dates';
import {format} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import medicationAPI from '../../api/medication';
import absentAPI from '../../api/absent';
import LoaderModal from '../../components/LoaderModal';
export default function ApplyForAbsent() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route: any = useRoute();
  const [date, setDate]: any = React.useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  let postReq: any[] = [];
  const onDismiss = useCallback(() => {
    setOpenDate(false);
  }, [setOpenDate]);
  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    reason: Yup.string().required('Reason is required'),
  });



  const onConfirm = useCallback(
    (params: any) => {
      setOpenDate(false);
      setDate(params.date);
    },
    [setOpenDate, setDate],
  );
  let studentIdArr: any[] = [];
  const onSubmit = useCallback(() => {
    route.params.stdArr.map((item: any, index: number) => {
     
      if (item.selected) {
        studentIdArr.push(item.id);
       

       
      }
    });
    postReq[0] = {
      studentId: studentIdArr,
      startDate: format(new Date(date), 'yyyy-MM-dd'),
      reason: reason,
    };
    try {
      (async () => {
        setLoading(true);
        await absentAPI.postAbsent(postReq[0]);

        setLoading(false);
      })();
    } catch {
      (e: any) => console.log(e);
    }
  }, [date, reason]);
  return (
    <Formik
    initialValues={{ date: '', reason: '' }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
    <>
      {loading ? (
        <LoaderModal />
      ) : (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View className="h-full w-full flex justify-center items-center">
              <View
                style={{
                  elevation: 3,
                }}
                className="bg-white border border-gray-200 flex justify-center items-center h-[150px] w-[300px] rounded-2xl">
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('NotifyAbsent');
                  }}
                  className="absolute top-1.5 right-1.5">
                  <Ionicons name="close" size={22} color="gray" />
                </TouchableOpacity>
                <View className="flex flex-grow justify-center items-center">
                  <Image
                    source={require('../../assets/images/absent/Featuredicon.png')}
                    className="w-12 h-12 mb-4"
                  />
                  <Text className="text-lg font-semibold">
                    You have sent Absent
                  </Text>
                  <Text className="text-lg font-semibold">
                    Notification for your child
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <View
            className={`bg-white ${
              modalVisible
                ? '!opacity-[0.5] absolute z-[1000] -top-[60px] h-[108%] pt-[60px]'
                : 'opacity-[1]'
            } flex-grow justify-between`}>
            <View className="flex mx-2">
              <View className="mt-3 ml-2">
                <Text className="text-sm pl-2 my-2">For</Text>
                <View className="flex-row pl-1">
                  {route.params.stdArr.map((item: any, index: number) => {
                    if (item.selected)
                      return (
                        <Image
                          key={index}
                          src={item.avatar}
                          resizeMode="cover"
                          className="w-10 h-10 rounded-full mr-2"
                        />
                      );
                  })}
                </View>
              </View>
              <Field
            name='date'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
              <View className="mx-3">
                <Text className="my-3" style={{}}>
                  Select Date
                </Text>
                <View className="w-full flex flex-row">
                  <TextInput
                    onPressIn={() => setOpenDate(true)}
                    style={{
                      marginHorizontal: 2,
                      borderRadius: 11,
                      fontSize: 15,
                      height: 40,
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
                    className="rounded-full py-1 px-1"
                    style={{marginLeft: -40, marginTop: 7, marginBottom: 10}}>
                    <MaterialCommunityIcons
                      name="calendar"
                      color="#001D6C"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {errors[name] && touched[name] && (
                                <Text
                                  maxFontSizeMultiplier={1.5}
                                  style={{
                                    color: 'red',
                                    marginTop: 4,
                                    marginLeft: 4,
                                  }}>
                                  {errors[name]}
                                </Text>
                              )}
              </View>)}</Field>
              <Field
            name='reason'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
              <View className="mx-3">
                <Text className="my-3" style={{}}>
                  Reason
                </Text>
                <View className="w-full flex flex-row">
                  <TextInput
                    style={{
                      marginHorizontal: 2,
                      borderRadius: 11,
                      fontSize: 15,
                      height: 60,
                      padding: Platform.OS === 'ios' ? 15 : 10,
                      width: '100%',
                      backgroundColor: '#FFF',
                      borderColor: '#001D6C80',
                      borderWidth: 1,
                      color: 'black',
                    }}
                    placeholderTextColor={'#8E8E8E'}
                    placeholder="Enter Reason"
                    value={reason}
                    onChangeText={e => setReason(e)}
                  />
                </View>
                {errors[name] && touched[name] && (
                                <Text
                                  maxFontSizeMultiplier={1.5}
                                  style={{
                                    color: 'red',
                                    marginTop: 4,
                                    marginLeft: 4,
                                  }}>
                                  {errors[name]}
                                </Text>
                              )}
              </View>)}</Field>
            </View>
            <View className="mx-10 mb-5">
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                  setModalVisible(true);
                }}
                className="bg-[#001D6C] py-3 rounded-md my-2 mt-10 ">
                <Text className="text-center text-white text-[16px] font-bold tracking-wide">
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotifyAbsent')}
                className="bg-white border-[#001D6C] py-3 rounded-md my-3 border-2  ">
                <Text className="text-center text-[#001D6C] font-bold text-[16px] tracking-wide">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openDate}
            onDismiss={onDismiss}
            date={date}
            onConfirm={onConfirm}
          />
        </>
      )}
    </>)}</Formik>
  );
}
