import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../assets/images/edubricklogo.svg';
import authAPI from '../../api/auth';
import md5 from 'md5';
import TokenStorage from '../../utils/tokenStorage';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHandler from '../../api/apiHandler';
import ProfileStorage from '../../utils/profileStorage';
import generalAPI from '../../api/general';
import {useContext} from 'react';
import {ParentContext} from '../../utils/context';

type Values = {
  userId: string;
  password: string;
};
export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [password, setPassword] = useState('');
  const [userId, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {state, dispatch}: any = useContext(ParentContext);
  const initialValues: Values = {
    userId: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().trim().required('Username is required.'),
    password: Yup.string().trim().required('Password is required.'),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values: Values) => {
    const bodydata = {userId: values.userId, password: md5(values.password)};

    try {
      let res = await authAPI.login(bodydata);
      if (res.success) {
        const token = res.data.tokens;
        await TokenStorage.set(token.accessToken, token.refreshToken);
        const id = res.data.payload.schoolId;
        AsyncStorage.setItem('schoolId', JSON.stringify(id));
        getProfile();
        navigation.replace('Main');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProfile = async () => {
    try {
      let res = await generalAPI.getProfile();
      if (res.success) {
        const profileData = res.data;
        dispatch({type: 'UPDATE_VALUE', payload: {profile: res.data}});
        await ProfileStorage.set(profileData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardDismiss>
      <SafeAreaView className="flex-1 bg-white h-full w-full">
        <StatusBar barStyle="dark-content" />
        <View className="flex-1 px-2">
          <View className="h-1/3 justify-center items-center">
            <Logo width={'60%'} height={'60%'} />
          </View>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({handleSubmit, handleChange, handleBlur, values}) => (
              <View className="bg-[#D7F2FF] px-4 py-3 pt-6 my- mx-6 mt-3 mb-3 rounded-2xl">
                <View>
                  <Text className="text-[#4A4A4A] mb-2">Username</Text>
                  <Field name="userId">
                    {({
                      field: {name, onBlur, onChange},
                      form: {touched, errors, setFieldTouched},
                    }: any) => (
                      <>
                        <TextInput
                          value={values.userId}
                          className="bg-white px-3 py-3 rounded-lg placeholder-[#4A4A4A]"
                          placeholder="Enter username"
                          returnKeyType="next"
                          //onChangeText={e => setUsername(e)}
                          onChangeText={handleChange('userId')}
                          onBlur={handleBlur('userId')}
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
                      </>
                    )}
                  </Field>
                </View>
                <View className="mt-5 mb-5">
                  <Text className="text-[#4A4A4A] mb-2">Password</Text>
                  <Field name="password">
                    {({
                      field: {name, onBlur, onChange},
                      form: {touched, errors, setFieldTouched},
                    }: any) => (
                      <>
                        <View className="w-full flex flex-row">
                          <TextInput
                            value={values.password}
                            className="bg-white px-3 py-3 rounded-lg placeholder-[#4A4A4A] w-full"
                            placeholder="Enter password"
                            secureTextEntry={!showPassword}
                            returnKeyType="done"
                            onChangeText={handleChange('password')}
                            onBlur={() => {
                              setFieldTouched(name);
                              onBlur(name);
                            }}
                          />
                          <TouchableOpacity
                            style={{marginLeft: -35, marginTop: 12}}
                            onPress={toggleShowPassword}>
                            {showPassword ? (
                              <MaterialCommunityIcons
                                name="eye-off"
                                color="#4A4A4A"
                                size={20}
                              />
                            ) : (
                              <MaterialCommunityIcons
                                name="eye"
                                color="#4A4A4A"
                                size={20}
                              />
                            )}
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
                      </>
                    )}
                  </Field>
                </View>
                <TouchableOpacity
                  className="-mt-1"
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text className="text-right text-[#4A4A4A] pr-1">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#DE5B48] rounded-md my-5"
                  onPress={() => handleSubmit()}>
                  <Text className="text-white font-semibold text-center py-3">
                    Log In
                  </Text>
                </TouchableOpacity>
                {/* <Button className="bg-[#DE5B48] rounded-md my-5" onPress={handleSubmit} title="Login" /> */}
              </View>
            )}
          </Formik>
          <View className="self-center mt-6">
            <View className="flex-row mb-2 px-2">
              <Text className="text-[#4A4A4A] text-xs">
                By logging in, you agree to Tadika App’s&nbsp;
              </Text>
              <Text className="text-[#5AA97E] text-xs">Terms of Service</Text>
            </View>
            <Text className="text-[#4A4A4A] text-xs text-center">
              If you can’t log in, please look for your administrator.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardDismiss>
  );
}
