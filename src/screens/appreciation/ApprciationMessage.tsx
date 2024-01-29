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
  Modal,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {format, set} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import bg from '../../assets/images/appreciationBoard.svg';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import generalAPI from '../../api/general';
import {Formik,Field} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../../components/DropDown';
const validationSchema = Yup.object().shape({
  message: Yup.date().required('Message is required'),
  teacherId: Yup.string().required('Teacher is required'),
});
const ApprciationMessage = ({id}:any) => {
  let data:any = {
    message: '',
    studentId: '',
    teacherId: '',
  };
  const Timeline = () => {
    const isFocused = useIsFocused()
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    // const [items, setItems] = useState<any[]>([
    //   {label: "Select Teacher's Name", value: 0},
    //   {label: 'Teacher Sarah', value: 1},
    //   {label: 'Teacher Diana', value: 2},
    // ]);
    const [items, setItems]: any[] = useState([{label: "Select Teacher's Name", value: 0}]);
const [selectedTeacher,setSelectedTeacher]= useState(null)
    const fetchData = useCallback(async () => {
      try {
        const res: any = await AsyncStorage.getItem('profile');
        const profileObj = JSON.parse(res);
        var teacherList: any[] = [];
        data.studentId = id;
        data.teacherId = selectedTeacher
        console.log(data);
        profileObj.students[0].person.classes[0].teachers.map(
          (data: any, index: number) =>
            teacherList.push({label: data.name, value: data.staffId}),
        );
        setItems(teacherList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, []);
    const handleSubmit = async (values: any) => {
      try {
        data.message = values.message;
        console.log(data);
        generalAPI.postAppreciation(data);
        setModalVisible(true);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);

    return (
      <Formik initialValues={{message: ''}} 
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values}) => ( <>

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
                  Your appreciation has been
                </Text>
                <Text className="text-lg font-semibold">
                  sent to our teacher
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        <ImageBackground
          className={`h-full w-full justify-end  ${
            modalVisible ? 'opacity-[0.5]' : 'opacity-[1]'
          } `}
          source={require('../../assets/images/appreciation-teacher.png')}>
          <View className="pb-[100px]">
          <Field
            name='teacherId'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
            <View className="m-4">
              <Text className="ml-3" style={{}}>
                Dear Teacher,
              </Text>
              <View className="w-full flex flex-row mt-2">
                <DropDownPicker
                onSelectItem={(e:any)=>setSelectedTeacher(e.value)}
                  listMode="SCROLLVIEW"
                  placeholder={"Select Teacher's Name"}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{backgroundColor: '#fff'}}
                />
                {/* <Dropdown
                  label={'Select Item'}
                  items={['Item 1', 'Item 2', 'Item 3']}
                /> */}
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
            name='message'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
            <View className="mx-4 my-5">
              <Text className=" text-center ml-3" style={{}}>
                Send Flower to Teacher and write something to show your love and
                respect
              </Text>
          
                  <View>
                    <TextInput
                      onChangeText={handleChange('message')}
                      onBlur={handleBlur('password')}
                      className="border border-[#001D6C80] my-2 rounded-xl p-2 h-[100px]"
                      value={values.message}
                    />
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="bg-[#001D6C] rounded-lg py-3  my-4">
                      <Text className="text-white text-center font-bold">
                        Send
                      </Text>
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
          </View>
        </ImageBackground>
      </>
        )}
        </Formik>
    );
  };
  return (
    <View className="mt-3">
      <Timeline />
    </View>
  );
};

export default ApprciationMessage;
