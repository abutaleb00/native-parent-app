import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Switch,
  Image,
  Platform,
} from 'react-native';
import medicationAPI from '../../api/medication';
import React, {useState, useCallback, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {DatePickerModal} from 'react-native-paper-dates';
import {format} from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import LoaderModal from '../../components/LoaderModal';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';
export default function CreateMedication() {
  const uploadImage = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    });
    return result;
  };
  let [imgURI, setImgURI]: any = useState(null);
  const [base64, setBase64]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicineName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showBottomSheetCurrent, setShowBottomSheetCurrent] = useState(false);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const bottomSheetRef: any = React.useRef(null);
  const snapPoints = React.useMemo(() => ['80%','90%'], []);
  const [afterMealToggle, setAfterMealToggle] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const onDismiss = useCallback(() => {
    setOpenDate(false);
  }, [setOpenDate]);
  const validationSchema = Yup.object().shape({
 medicine: Yup.string().trim().required('Name is required'),
 remarks: Yup.string().trim().required('Remarks is required.'),


    date: Yup.string().trim().required('Date is required.'),

  });
  const initialValues = {
    medicine: '',
    remarks: '',
    date: '',
 

  };
  const onConfirm = useCallback(
    ({startDate, endDate}: any) => {
      setOpenDate(false);
      setDate(startDate);
      setEndDate(endDate);
    },
    [setOpenDate, setDate, setEndDate],
  );
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setShowBottomSheetCurrent(true);
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setShowBottomSheetCurrent(false);
  };
  let [postReq, setPostReq]: any[] = useState([
    {
      studentId: [],
      startDate: format(new Date(date), 'yyyy-MM-dd'),
      endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      
      medicines: [],
    },
  ]);

  const [medicines, setMedicines]: any[] = useState([]);
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
      medicines: medicines,
    };
    try {
      (async () => {
        setLoading(true);
        await medicationAPI.postMedication(postReq[0]);
        navigation.navigate('HealthInfo', {
          medicine: postReq[0],
          stdArr: studentIdArr,
        });
        setLoading(false);
      })();
    } catch {
      (e: any) => console.log(e);
    }
  }, [medicines, date]);

  useEffect(() => {
    if (route.params.currentItem) {
      console.log('route.parms', route.params);
      setShowBottomSheet(true);
      openBottomSheet();
      setMedicineName(route.params.currentItem[0].name);
      setRemarks(route.params.currentItem[0].remarks);
      setAfterMealToggle(
        route.params.currentItem[0].consumptionMode === 'AfterMeal'
          ? true
          : false,
      );
      setDate(route.params.openDate);
      setEndDate(route.params.closeDate);
    }
  }, []);
  useEffect(() => {
    (postReq[0].startDate = date), (postReq[0].endDate = endDate);
    setPostReq(postReq);
  }, [date]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({values, errors, handleChange, handleSubmit,setFieldValue}) => { 
        useEffect(() => {
          setFieldValue('date',date);
         
          setFieldValue('name',medicine);
          setFieldValue('remarks',remarks);
         
        },[date,medicine,remarks])
        return <>
      {loading ? (
        <LoaderModal />
      ) : (
        <>
          <View
            className={`flex-1 ${
              !showBottomSheetCurrent ? 'bg-white' : 'bg-gray opacity-20'
            } pt-3`}>
            <View className="mx-4 -z-10">
              <View>
                <View className="mt-2 ml-2">
                  <Text className="text-sm pl-2 my-2">For</Text>
                  <View className="flex-row pl-1">
                    {route.params.stdArr.map((item: any, index: number) => {
                      if (item.selected) {
                        return (
                          <Image
                            key={index}
                            src={item.imageUrl}
                            className="rounded-full h-8 w-8 mr-2"
                          />
                        );
                      }
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
                <View className="mx-2 my-1">
                  <Text className="my-3 text-[#001D6C]" style={{}}>
                    Select Duration
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
                      value={
                        date
                          ? `${format(new Date(date), 'dd/MM/yy')} - ${format(
                              new Date(endDate),
                              'dd/MM/yy',
                            )}`
                          : ''
                      }
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
                <View
                  className="border-gray-200 mt-3 mx-3 my-3"
                  style={{borderWidth: 1}}></View>
                <Text className="text-[#001D6C] font-bold pl-3 text-2xl mb-2">
                  Your Kid’s Medication
                </Text>
                <View className="flex mt-4 justify-center items-center">
                  {medicines?.length < 1 ? (
                    <>
                      <Ionicons
                        className=""
                        name="medkit-outline"
                        size={70}
                        color="#B2BBD3"
                      />
                      <Text className="text-sm text-[#999999] mt-5">
                        No medication request. Click the plus button to add.
                      </Text>
                      <View className="my-3 mx-2">
                        <TouchableOpacity
                          onPress={() => {
                            setShowBottomSheet(true);
                            setShowBottomSheetCurrent(true);
                            if (showBottomSheet) {
                              openBottomSheet();
                            }
                          }}
                          className="bg-[#001D6C] flex-row justify-center items-center rounded-md px-8 py-3 text-center">
                          <MaterialCommunityIcons
                            name="plus"
                            color="#ffffff"
                            size={30}
                          />
                          <Text className="text-white text-center text-xl ml-1 font-semibold">
                            Add Medication
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View
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
                            <View className="w-8 h-8 rounded">
                              <Image
                                className=""
                                source={require('../../assets/images/medi1.png')}
                                resizeMode="contain"
                              />
                            </View>
                            <Text className="text-lg text-[#001D6C] font-semibold px-2">
                              {medicines[0]?.name} |{' '}
                              {medicines[0]?.consumptionMode}
                            </Text>
                          </View>
                          <Text className="text-[12px] text-[#A6A4A4] py-1 mx-2">
                            Remarks:{' '}
                            <Text className="text-black">
                              {medicines[0]?.remarks}
                            </Text>{' '}
                          </Text>
                        </View>
                      </View>

                      <View className="my-3 mx-2">
                        <TouchableOpacity
                          onPress={() => {
                            setShowBottomSheet(true);
                            setShowBottomSheetCurrent(true);
                            if (showBottomSheet) {
                              openBottomSheet();
                            }
                          }}
                          className="flex-row justify-center items-center rounded-md px-8 py-3 text-center">
                          <MaterialCommunityIcons
                            name="plus"
                            color="#9ca3af"
                            size={30}
                          />
                          <Text className="text-gray-400 text-center text-xl ml-1 font-semibold">
                            Add Medication
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              </View>

              <DatePickerModal
                locale="en"
                mode="range"
                visible={openDate}
                onDismiss={onDismiss}
                startDate={date}
                endDate={endDate}
                onConfirm={onConfirm}
              />
            </View>
            <View className="absolute bottom-0 w-full">
              <TouchableOpacity
                onPress={() => {
                  handleSubmit()
                }}
                className="bg-[#001D6C] mx-8 flex-row justify-center items-center rounded-md px-24 py-2 text-center text-white">
                <Text className="font-semibold text-lg tracking-wider text-white">
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                className="bg-white border-2 border-[#001D6C] mb-8 mt-4 mx-8 flex-row justify-center items-center rounded-md px-24 py-2 text-center text-white">
                <Text className="font-semibold text-lg tracking-wider text-[#001D6C]">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showBottomSheet && (
            <BottomSheet
            index={imgURI === null?0:1}
              enablePanDownToClose={true}
              onClose={() => setShowBottomSheetCurrent(false)}
              snapPoints={snapPoints}
              ref={bottomSheetRef}
              handleIndicatorStyle={{backgroundColor: '#9ca3af', width: 50}}
              style={{
                flex: 1,
              }}>
              <View className="w-full border-b flex justify-center items-center border-gray-200">
                <Text className="text-[#001D6C] font-bold text-xl my-2">
                  Add Medicine
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    const img: any = await uploadImage();
                    setBase64(img.assets[0].base64);
                    console.log(img);
                    setImgURI(img.assets[0].uri);
                  }}
                  className="w-10 h-10 bg-gray-200 p-1 rounded-lg absolute right-5 top-0 ">
                  <Image
                    className="w-full h-full"
                    source={require('../../assets/images/Vector.png')}
                  />
                </TouchableOpacity>
              </View>
              <View className="mx-5">
                {imgURI ? (
                  <View className="w-[140px] h-[140px] mx-auto mt-2 rounded-xl overflow-hidden">
                    <Image source={{uri: imgURI}} className="w-full h-full " />
                    <TouchableOpacity
                      onPress={() => {
                        setBase64(null);
                        setImgURI(null);
                      }}
                      className={`absolute right-2 top-2 ${
                        base64 === null ? 'hidden' : 'flex'
                      }`}>
                      <Ionicons name="close" size={20} color={'white'} />
                    </TouchableOpacity>
                  </View>
                ) : null}
                  <Field
            name='medicine'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
                <View className="my-3">
                  <Text className="text-[#001D6C]">Medicine Name</Text>
                  <TextInput
                    value={medicine}
                    onChangeText={(e: any) => setMedicineName(e)}
                    className="bg-white px-3 py-1 mt-2 rounded-lg border-[#001D6C] placeholder-[#4A4A4A]"
                    placeholder="Enter Name"
                    style={{borderWidth: 1, height: 50}}
                  />
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
            name='remarks'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
                <View className="my-3">
                  <Text className="text-[#001D6C]">Remarks</Text>
                  <TextInput
                    value={remarks}
                    onChangeText={e => setRemarks(e)}
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    className="bg-white px-3 py-1 mt-2 rounded-lg border-[#001D6C] placeholder-[#4A4A4A]"
                    placeholder="Enter Remarks"
                    style={{borderWidth: 1, height: 70}}
                  />
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
                <View className="flex flex-row justify-between my-3">
                  <View className="flex flex-row items-center">
                    <Image
                      source={require('../../assets/images/meal.png')}
                      className="mr-2 ml-2"
                    />
                    <Text className="text-[#001D6C]">After Meal</Text>
                  </View>
                  <Switch
                    value={afterMealToggle}
                    thumbColor={'#fff'}
                    trackColor={{false: '#4A4A4A', true: '#38bdf8'}}
                    onValueChange={() => {
                      setAfterMealToggle(!afterMealToggle);
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    medicines.push({
                      name: medicine,
                      remarks: remarks,
                      consumptionMode: afterMealToggle
                        ? 'AfterMeal'
                        : 'BeforeMeal',
                    });
                    setMedicines(medicines);
                    closeBottomSheet();
                  }}
                  className="bg-[#001D6C] m-4 rounded-md py-3 text-center">
                  <Text className="text-white text-center font-semibold">
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </BottomSheet>
          )}
        </>
      )}
    </>}}</Formik>
  );
}
