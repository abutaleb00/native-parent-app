import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  SafeAreaView,
  Modal,
  RefreshControl
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Checkbox} from 'react-native-paper';
import medicationAPI from '../../api/medication';
import {format} from 'date-fns';
import DropDownPicker from 'react-native-dropdown-picker';
import LoaderModal from '../../components/LoaderModal';
import MedicationCard from './Cards/MedicationCard';
import AllergyCard from './Cards/AllergyCard';
import BottomSheet from '@gorhom/bottom-sheet';
import {ParentContext} from '../../utils/context';
export default function HealthEvent({id}: any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route: any = useRoute();
  const [floatMenu, setFloatMenu] = useState<boolean>(false);
  const [resposeMessage, setResposeMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [studentId, setStudentId] = useState<number | null>(id);
  const [medicationData, setMedicationData] = useState([]);
  const [allergyData, setAllergyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown]: any[] = useState([]);
  const showDialog = () => setVisible(true);
  const snapPoints = React.useMemo(() => ['15%', '30%'], []);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showBottomSheetCurrent, setShowBottomSheetCurrent] = useState(false);
  const [medicationId, setMedicationId] = useState();
  const [stdArr, setStdArr] = useState();
  const [currentItem, setCurrentItem]: any = useState();
  const [openDate, setOpenDate] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllMedication();
    getAllAllergy();
  }, []);
  const bottomSheetRef: any = React.useRef(null);
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  useEffect(() => {
    if (showBottomSheetCurrent) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [showBottomSheetCurrent]);

  useEffect(() => {
    getAllMedication();
    getAllAllergy();
  }, [studentId]);

  const getAllMedication = async () => {
    try {
      setLoading(true);
      let res = await medicationAPI.getAllMedication(studentId);
      if (res.success) {
        
        setMedicationData(res.data);
        res.data.map(() => {
          showDropdown.push(false);
        });
        setShowDropdown(showDropdown);
      }
      setLoading(false);
    } catch (error) {
      console.log('error in appreciation', error);
      if (error) {
        setRefreshing(false);
        setResposeMessage(error.toString());
        setIsError(true);
        showDialog();
      }
    }
  };
  const getAllAllergy = async () => {
    try {
      setLoading(true);
      let res = await medicationAPI.getAllAllergy(studentId);
      if (res.success) {
        setRefreshing(false);
        setAllergyData(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.log('error in appreciation', error);
      if (error) {
        setRefreshing(false);
        setResposeMessage(error.toString());
        setIsError(true);
        showDialog();
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#FCFEFF',
      }}>
      {loading ? (
        <LoaderModal />
      ) : (
        <>
          <View
            className={`h-full ${
              showBottomSheetCurrent ? 'opacity-80 bg-gray-400' : 'opacity-100'
            }`}>
            <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            >
              <>
                {medicationData.length > 0 ? (
                  medicationData.map((item: any, index) => (
                    <MedicationCard
                      item={item}
                      key={index}
                      index={index}
                      setShowBottomSheetCurrent={setShowBottomSheetCurrent}
                      showBottomSheetCurrent={showBottomSheetCurrent}
                      setMedicationId={setMedicationId}
                      setStdArr={setStdArr}
                      setCurrentItem={setCurrentItem}
                      setOpenDate={setOpenDate}
                      setCloseDate={setCloseDate}
                    />
                  ))
                ) : (
                  <>
                    <View className="flex-1 justify-center items-center">
                      <Ionicons
                        className=""
                        name="medkit-outline"
                        size={70}
                        color="#B2BBD3"
                      />
                      <Text className="text-xs text-[#999999] mt-5">
                        No medication request. Click the plus button to add.
                      </Text>
                    </View>
                  </>
                )}
                {allergyData?.length > 0 &&
                  allergyData.map((item: any, index: number) => {
                    return (
                      <AllergyCard
                        item={item}
                        key={index}
                        setShowBottomSheetCurrent={setShowBottomSheetCurrent}
                        showBottomSheetCurrent={showBottomSheetCurrent}
                        setCurrentItem={setCurrentItem}
                        setStdArr={setStdArr}
                        setStudentId={setStudentId}
                      />
                    );
                  })}
              </>
            </ScrollView>
          </View>
          {floatMenu === true && (
            <>
              <Pressable
                onPress={() =>
                  navigation.navigate('HealthChildList', {
                    next: 'SelectAllergies',
                  })
                }>
                <View
                  className="flex-row items-center justify-center absolute pl-4 rounded-full  bg-white border border-gray-200 right-5"
                  style={{bottom: 170}}>
                  <Text className="text-[#001D6C] mr-3 text-base font-semibold">
                    Add Allergy
                  </Text>
                  <View className="w-12 h-12 rounded-full items-center justify-center text-center  px-1 py-1 bg-[#D4DEEC]">
                    <Image
                      source={require('../../assets/images/allergy.png')}
                      resizeMode="contain"
                      className="w-7 py-1 px-1 z-40"
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate('HealthChildList', {
                    next: 'CreateMedication',
                  })
                }>
                <View
                  className="flex-row items-center justify-center absolute bg-white border border-gray-200  pl-4 rounded-full bottom-32 right-5"
                  style={{bottom: 110}}>
                  <Text className="text-[#001D6C] mr-3 text-base font-semibold">
                    Add Medication
                  </Text>
                  <View className="w-12 h-12 rounded-full items-center justify-center text-center  px-1 py-1 bg-[#D4DEEC]">
                    <Image
                      source={require('../../assets/images/addmedi.png')}
                      resizeMode="contain"
                      className="w-7 py-1 px-1 z-40"
                    />
                  </View>
                </View>
              </Pressable>
            </>
          )}
          <TouchableOpacity
            className="w-12 h-12 z-40 rounded-full text-center items-center justify-center bg-[#001D6C] absolute bottom-10 right-5"
            style={{
              display: showBottomSheetCurrent ? 'none' : 'flex',
              elevation: 3,
              shadowColor: '#000', // Shadow color
              shadowOffset: {width: 0, height: 2}, // Shadow offset
              shadowOpacity: 0.2, // Shadow opacity
              shadowRadius: 2, // Shadow radius
            }}
            onPress={() => setFloatMenu(!floatMenu)}>
            {floatMenu === false ? (
              <Ionicons
                className=""
                name="add-outline"
                size={30}
                color="#ffffff"
              />
            ) : (
              <Ionicons className="" name="close" size={30} color="#ffffff" />
            )}
          </TouchableOpacity>
          <BottomSheet
            enablePanDownToClose={true}
            onClose={() => setShowBottomSheetCurrent(false)}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            index={-1}
            handleIndicatorStyle={{backgroundColor: '#9ca3af', width: 50}}
            style={{
              flex: 1,
              // zIndex: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(
                  currentItem?.allergy ? 'SelectAllergies' : 'CreateMedication',
                  {
                    stdArr: stdArr,
                    currentItem: currentItem,
                    openDate: openDate,
                    closeDate: closeDate,
                  },
                );
              }}
              className="w-full border-b flex justify-center items-center border-gray-200">
              <Text className="text-[#001D6C] font-semibold text-xl py-4">
                Edit {currentItem?.allergy ? 'Allergy' : 'Medication'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (currentItem?.allergy) {
                  await medicationAPI.deleteAllergy({studentId: studentId});
                  getAllAllergy();
                } else {
                  await medicationAPI.deleteMedication({id: medicationId});
                  getAllMedication();
                }
              }}
              className="w-full flex justify-center items-center">
              <Text className="text-[#001D6C] font-semibold text-xl py-4">
                Delete {currentItem?.allergy ? 'Allergy' : 'Medication'}
              </Text>
            </TouchableOpacity>
          </BottomSheet>
        </>
      )}
    </SafeAreaView>
  );
}
