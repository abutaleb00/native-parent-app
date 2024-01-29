import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useState, useContext} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {SvgUri} from 'react-native-svg';
import transportAPI from '../../api/transport';
import {useNavigation} from '@react-navigation/native';
import generalAPI from '../../api/general';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ParentContext} from '../../utils/context';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';
export default function AddAuthorizedPickUp() {
  const {state, dispatch}: any = useContext(ParentContext);
  const navigation: any = useNavigation();
  let [imgURI, setImgURI]: any = useState(null);
  const [base64, setBase64]: any = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const initialValues = {
    imgURI: imgURI,
    name: name,
    id: id,
  }
  const validationSchema = Yup.object().shape({
    imgURI: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    id: Yup.string().required('Required'),
  });
  const uploadImage = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    });
    return result;
  };
  const post = useCallback(() => {
    (async () => {
      try {
        const res = await generalAPI.postImage({base64: base64});
        console.log(res);
        await transportAPI.postAuthorized({
          personId: state.main.profile.students[0].person.id,
          postObj: {
            name: name,
            idNumber: id,
            avatarUrl: imgURI,
          },
        });
        navigation.navigate('Authorized Pick-Up', {
          name: name,
          idNumber: id,
          avatarUrl: imgURI,
        });
      } catch {
        (e: any) => console.log(e);
      }
    })();
  }, [name, id, imgURI]);
const handleSubmit = () => {
  post();
}

  return (
    <View className="flex-1 bg-white pt-3">
      <View className="mx-5">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {({handleSubmit, handleChange, setFieldValue, values}) => {
            React.useEffect(() => {
              setFieldValue('imgURI', imgURI);
              setFieldValue('name', name);
              setFieldValue('id', id);
            }, [imgURI, name, id]);
            return <>
            <Field
            name='imgURI'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
                            <View className="relative h-[170px] w-full flex items-center">
                            {imgURI ? (
                              <Image
                                className="h-[170px] w-[170px] rounded-xl"
                                src={`${imgURI}`}
                              />
                            ) : null}
                  
                            <View className="absolute h-[170px] justify-center">
                              <TouchableOpacity
                                className={`${
                                  imgURI ? null : 'bg-gray-200'
                                } h-[170px] w-[170px] rounded-xl flex justify-center items-center`}
                                onPress={async () => {
                                  const img: any = await uploadImage();
                                  setBase64(img.assets[0].base64);
                                  console.log(img);
                                  setImgURI(img.assets[0].uri);
                                }}>
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
                                <Image
                                  className="h-[77px] w-[77px]"
                                  source={require('../../assets/images/transport/gg_profile.png')}
                                />
                                <Image
                                  className={`h-[30px] w-[30px] -mt-6 ml-12 ${
                                    imgURI ? 'hidden' : 'flex'
                                  }`}
                                  source={require('../../assets/images/transport/typcn_plus.png')}
                                />
                  
                                <View className={`items-center ${imgURI ? 'hidden' : 'flex'}`}>
                                  <Text>Upload Profile</Text>
                                  <Text>Image</Text>
                                </View>
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
                          </View>
                          )}
            </Field>
       
            <Field
            name='name'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
        <View className="my-3">
          <Text className="text-[#001D6C]">Authorised Pick-up Full Name</Text>
          <TextInput
            value={name}
            onChangeText={e => setName(e)}
            className="bg-white px-3 py-3 mt-2 rounded-lg border-[#001D6C] placeholder-[#4A4A4A]"
            placeholder="Enter name"
            style={{borderWidth: 1}}
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
        </View>  )}</Field>
        <Field
            name='id'
            >
               {({
                            field: {name, onBlur, onChange},
                            form: {touched, errors, setFieldTouched},
                          }: any) => (
        <View className="my-3">
          <Text className="text-[#001D6C]">ID Number</Text>
          <TextInput
            value={id}
            onChangeText={e => setId(e)}
            className="bg-white px-3 py-3 mt-2 rounded-lg border-[#001D6C] placeholder-[#4A4A4A]"
            placeholder="Enter id nummber"
            style={{borderWidth: 1}}
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
        {/* <View className="my-3">
          <Text className="text-[#001D6C]">Phone Number</Text>
          <TextInput
            className="bg-white px-3 py-3 mt-2 rounded-lg border-[#001D6C] placeholder-[#4A4A4A]"
            placeholder="Enter phone nummber"
            style={{borderWidth: 1}}
          />
        </View> */}
        <View className="my-3 mx-6 mt-20">
          <TouchableOpacity
            onPress={() => {
              handleSubmit()
            }}
            className="bg-[#001D6C] rounded-md py-3 text-center">
            <Text className="text-white text-center font-semibold">Submit</Text>
          </TouchableOpacity>
        </View>
        <View className="my-3 mx-6">
          <TouchableOpacity
            className="bg-white border-[#001D6C] rounded-md py-3 text-center"
            style={{borderWidth: 1}}>
            <Text className="text-[#001D6C] text-center font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>
        </View></>
            }}
            </Formik>
      </View>
      
    </View>
  );
}
