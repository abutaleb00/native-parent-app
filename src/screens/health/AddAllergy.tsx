import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute, useNavigation} from '@react-navigation/native';
import medicationAPI from '../../api/medication';
import {ParentContext} from '../../utils/context';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';

const AddAllergy = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [name, setName] = React.useState(
    route.params?.currentItem ? route.params?.currentItem.name : '',
  );
  const [remarks, setRemarks] = React.useState(
    route.params?.currentItem ? route.params?.currentItem.remarks : '',
  );
  const {state, dispatch}: any = useContext(ParentContext);
  let obj: any[] = [];
  if (route.params.currentItem) {
    state.main.profile.students.map((item: any, index: number) => {
      obj.push({
        id: item.person.id,
        name: item.name,
        avatar: item.avatarUrl,
        selected:
          route.params.currentItem.studentId === item.person.id ? true : false,
      });
    });
    route.params.stdArr = obj;
  } else {
    route.params.stdArr.map((data: any) => (data.avatar = data.imageUrl));
  }

  console.log(route.params?.stdArr);
  return (
    <Formik
      initialValues={{name: '', remarks: ''}}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .trim()
          .required('Allergy name is required.'),
        remarks: Yup.string().trim(),
      })}
      onSubmit={async (values) => {
        try {
          const response = await medicationAPI.postAllergy({
            studentId: route.params.stdArr
              .filter((item:any) => item.selected)
              .map((item:any) => item.id),
            remarks: values.remarks,
            allergies: route.params.allergens.map((item:any) => item.name),
          });
          navigation.navigate('HealthInfo', {data: response.data});
        } catch (error) {
          console.error(error);
        }
      }}>
      {({values, errors, handleChange, handleSubmit}:any) => (
        <View className="px-4 py-1 flex items-center h-full">
          <View className="w-full">
            <View className="pb-4">
              <Text className="text-sm pl-2 my-2">For</Text>
              <View className="flex-row pl-1">
                {route.params.stdArr.map((item: any, index: number) => {
                  if (item.selected) {
                    return (
                      <Image
                        key={index}
                        src={item.avatar}
                        resizeMode="cover"
                        className="w-10 h-10 border rounded-full mr-2"
                      />
                    );
                  }
                })}
              </View>
            </View>
            <View className="mb-12">
              <Text className="pb-4">Allergic to</Text>
              <View className="flex flex-row justify-start gap-4">
                {route.params?.allergens?.map((item: any, index: number) => (
                  <View
                    key={index}
                    className="bg-gray-300 p-2 rounded-full h-[64px] w-[64px] flex items-center justify-center relative">
                    <Image source={item.src} />
                    <View className="absolute -bottom-6 w-[70px] flex items-center">
                      <Text className=" text-gray-600 font-semibold">
                        {item.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <Text className="text-[16px] text-gray-700 font-[400]">
              Allergy Name
            </Text>
            <Field
              name="name"
              component={TextInput}
              onChangeText={handleChange('name')}
              className="border border-gray-400 h-12 rounded-xl my-2 px-4 text-[16px] text-gray-800"
              value={values.name}
            />
            <Text className="text-[16px] text-gray-700 my-2 font-[400]">
              Remarks / Specify Others
            </Text>
            <Field
              name="remarks"
              component={TextInput}
              onChangeText={handleChange('remarks')}
              multiline
              className="border border-gray-400 h-12 rounded-xl my-2 px-4"
              value={values.remarks}
            />
          </View>
          <View className="my-6 absolute bottom-0 w-full">
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#001D6C] flex-row px-16 mb-4 justify-center items-center rounded-md mx-6 py-2 text-center">
              <MaterialCommunityIcons name="plus" color="#ffffff" size={25} />
              <Text className="text-white text-center text-lg ml-1 font-semibold">
                Add Allergy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              className=" border-2 border-[#001D6C] flex-row px-16 justify-center items-center rounded-md mx-6 py-2 text-center">
              <Text className="text-[#001D6C] text-center text-lg ml-1 font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddAllergy;