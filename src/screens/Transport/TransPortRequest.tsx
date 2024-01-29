import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Image,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import React, {useState, useCallback, useEffect, useContext} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {DatePickerModal, registerTranslation} from 'react-native-paper-dates';
import {add, format} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import transportAPI from '../../api/transport';
import {useRoute} from '@react-navigation/native';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';
import {ParentContext} from '../../utils/context';
import LoaderModal from '../../components/LoaderModal';
import MapViewDirections from 'react-native-maps-directions';
export default function TransPortRequest() {
  const [showBottomSheetCurrent, setShowBottomSheetCurrent] = useState(false);
  const {state, dispatch}: any = useContext(ParentContext);
  const snapPoints = React.useMemo(() => ['40%'], []);
  const [loading, setLoading] = useState(false);
  const route: any = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [date, setDate]: any = React.useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [address, setAddress] = useState('');
  const mapRef: any = React.useRef(null);
  const bottomSheetRef: any = React.useRef(null);
  const [location, setLocation]: any = useState({
    latitude: 0,
    longitude: 0,
  });
  const [schoolLocation, setSchoolLocation]: any = useState({
    latitude: 0,
    longitude: 0,
  });
  const validationSchema = Yup.object().shape({
    address: Yup.string().trim().required('Location is required.'),
    date: Yup.string().trim().required('Date is required.'),
  });
  const initialValues = {
    date: '',
    address: '',
  };
  let postReq: any[] = [];
  const handleConvert = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          '2A, Jalan Stesen Sentral 2, Q Sentral @ Kuala Lumpur Sentral',
        )}&key=AIzaSyA0uuKpQZAhTm16dBIln-me0ug9sBvP_LQ`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.results.length > 0) {
        const {lat, lng} = data.results[0].geometry.location;
        console.log(lat, lng);
        setSchoolLocation({
          latitude: lat,
          longitude: lng,
        });
      } else {
        setSchoolLocation({
          latitude: null,
          longitude: null,
        });
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  const getAddressFromApi = async (lat: any, long: any) => {
    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyA0uuKpQZAhTm16dBIln-me0ug9sBvP_LQ`,
      );
      let responseJson = await response.json();
      if (responseJson.status === 'OK') {
        setAddress(responseJson.results[0].formatted_address);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (location: any) =>
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true},
    );
  }, []);
  useEffect(() => {
    handleConvert();
    getAddressFromApi(location.latitude, location.longitude);
    mapRef.current.animateToRegion({
      latitude: location?.latitude,
      longitude: location?.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, [location]);
  useEffect(() => {
    var arrId: any = [];
    route.params.stdArr.map((item: any, index: number) => {
      if (item.selected) {
        arrId.push(item.id);
      }
    });
    postReq.push({
      personId: arrId,
      date: format(new Date(date), 'yyyy-MM-dd'),
      address: address,
    });
  }, [address, date]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await transportAPI.dropOff(postReq[0]);
      setLoading(false);
      setShowBottomSheetCurrent(true);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const onDismiss = useCallback(() => {
    setOpenDate(false);
  }, [setOpenDate]);

  const onConfirm = useCallback(
    (params: any) => {
      setOpenDate(false);
      setDate(params.date);
    },
    [setOpenDate, setDate],
  );
  return (
    <>
      {loading ? (
        <LoaderModal />
      ) : (
        <>
          <View
            className={`${
              showBottomSheetCurrent ? 'opacity-20 ' : 'opacity-100 flex-grow'
            }`}>
            <View className="max-h-[50%]">
              <MapView
                ref={mapRef}
                showsUserLocation
                followsUserLocation
                style={{width: '100%', height: '100%'}}
                initialRegion={{
                  latitude: location?.latitude,
                  longitude: location?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <MapViewDirections
                  origin={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                  }}
                  destination={{
                    latitude: schoolLocation?.latitude,
                    longitude: schoolLocation?.longitude,
                  }}
                  apikey="AIzaSyA0uuKpQZAhTm16dBIln-me0ug9sBvP_LQ"
                  strokeColor="#4ade80"
                  strokeWidth={10}
                />
                <Marker
                  draggable
                  coordinate={location}
                  onDragEnd={e => setLocation(e.nativeEvent.coordinate)}
                />
                <Marker
                  draggable
                  coordinate={schoolLocation}
                  onDragEnd={e => setSchoolLocation(e.nativeEvent.coordinate)}
                />
              </MapView>
            </View>
            <View
            className="max-h-[55%]"
            >
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({handleSubmit, handleChange, setFieldValue, values}) => {
                  useEffect(() => {
                    setFieldValue('date', date);
                    setFieldValue('address', address);
                  }, [date, address]);
                  return (
                    <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingTop: 10,
                      backgroundColor: 'white',
                    }}
                    className="flex">
                      <View className="mx-3">
                        <Text className="my-3" style={{}}>
                          Drop-off Location
                        </Text>
                        <View className="w-full flex flex-row">
                          <Field name="address">
                            {({
                              field: {name, onBlur, onChange},
                              form: {touched, errors, setFieldTouched},
                            }: any) => (
                              <View className="w-full">
                                <TextInput
                                  value={address}
                                  onPressIn={() => setModalVisible(true)}
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
                                    paddingRight: 30,
                                  }}
                                  placeholderTextColor={'#8E8E8E'}
                                  readOnly
                                  placeholder="2A, Jalan Stesen Sentral 2, Q Sentral @ Kuala Lumpur Sentral"
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
                              </View>
                            )}
                          </Field>
                          <Pressable
                            onPress={() => setModalVisible(true)}
                            className="rounded-full py-1 px-1"
                            style={{
                              marginLeft: -40,
                              marginTop: 15,
                              marginBottom: 10,
                            }}>
                            <MaterialCommunityIcons
                              name="map-marker"
                              color="#001D6C"
                              size={20}
                            />
                          </Pressable>
                        </View>
                      </View>
                      <View className="mx-3 pb-5">
                        <Text className="my-3" style={{}}>
                          Select Date
                        </Text>
                        <View className="w-full flex flex-row">
                          <Field name="date">
                            {({
                              field: {name, onBlur, onChange},
                              form: {touched, errors, setFieldTouched},
                            }: any) => (
                              <View className="w-full">
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
                                  value={format(date, 'yyyy-MM-dd')}
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
                              </View>
                            )}
                          </Field>
                          <TouchableOpacity
                            onPress={() => setOpenDate(true)}
                            className="rounded-full py-1 px-1"
                            style={{
                              marginLeft: -40,
                              marginTop: 7,
                              marginBottom: 10,
                            }}>
                            <MaterialCommunityIcons
                              name="calendar"
                              color="#001D6C"
                              size={20}
                            />
                          </TouchableOpacity>
                        </View>
                        <View className="mt-3">
                          <Text className="text-sm pl-2 my-2">For</Text>
                          <View className="flex-row pl-1">
                            {route.params.stdArr.map(
                              (item_: any, index: number) => {
                                if (item_.selected) {
                                  return (
                                    <Image
                                      key={index}
                                      source={{uri: item_.avatar}}
                                      resizeMode="cover"
                                      className="w-10 h-10 rounded-full mr-2"
                                    />
                                  );
                                }
                              },
                            )}
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleSubmit()}
                          className="bg-[#001D6C] py-3 rounded-md my-4">
                          <Text className="text-center text-white font-semibold">
                            Submit
                          </Text>
                        </TouchableOpacity>
                        <DatePickerModal
                          locale="en"
                          mode="single"
                          visible={openDate}
                          onDismiss={onDismiss}
                          date={date}
                          onConfirm={onConfirm}
                        />
                      </View>
                    </ScrollView>
                  );
                }}
              </Formik>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.modal}>
              <View className="flex-row py-3">
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <MaterialCommunityIcons
                    name="chevron-left"
                    color="#001D6C"
                    size={32}
                  />
                </Pressable>

                <Text className="text-center text-[#001D6C] font-semibold text-xl ml-8">
                  Drop-off Location
                </Text>
              </View>
              <GooglePlacesAutocomplete
                placeholder="Search Address"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  setAddress(data.description);
                  setModalVisible(!modalVisible);
                }}
                query={{
                  key: 'AIzaSyA0uuKpQZAhTm16dBIln-me0ug9sBvP_LQ',
                  language: 'en',
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: '#E1E3E6',
                    borderColor: '#E1E3E6',
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                  },
                  textInput: {
                    height: 38,
                    color: '#5A6474',
                    backgroundColor: '#E1E3E6',
                    fontSize: 14,
                    borderRadius: 10,
                    marginTop: 5,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
              />
            </View>
          </Modal>
        </>
      )}
      <BottomSheet
        enablePanDownToClose={true}
        onClose={() => setShowBottomSheetCurrent(false)}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        index={showBottomSheetCurrent ? 0 : -1}
        handleIndicatorStyle={{backgroundColor: '#9ca3af', width: 50}}
        style={{
          flex: 1,
          // zIndex: 50,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'white',
          elevation: 2,

          borderRadius: 60,
        }}>
        <View className=" flex pb-4 flex-grow items-center justify-end px-2 gap-4">
          <Text className="text-xl font-semibold text-blue-900">
            Transport Applied Successfully
          </Text>
          <View className="flex items-center">
            <Text className="text-gray-900">
              Your Child's teacher will acknowledge
            </Text>
            <Text className="text-gray-900">
              the request and arrange the transport.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ApplyTransport', {upcoming: postReq[0]});
            }}
            className="bg-green-500 flex items-center w-full py-1.5  rounded-md">
            <Text className="text-xl font-semibold text-white">Done</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
}
const styles = StyleSheet.create({
  modal: {
    top: '0%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 30,
  },
});
