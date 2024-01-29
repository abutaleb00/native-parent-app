import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../assets/images/edubricklogo.svg';
import authAPI from '../../api/auth';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';
import {Button} from 'react-native-paper';

type Values = {
  email: string;
};

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const initialValues: Values = {
    email: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Please enter a valid email address')
      .required('Email is required.')
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        'Please enter a valid email address',
      ),
  });

  const submit = async (val: any) => {
    try {
      let body = {
        email: val.email,
      };
      const res = await authAPI.getOTP(body);
      if (res.success) {
        const data = {
          email: val.email,
          OTP_expiry: res.data.OTP_expiry,
        };
        navigation.navigate('Otp', data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-full w-full">
      {/* <TopBar title={'Forgot Password'} showShadow={false}></TopBar> */}
      <StatusBar barStyle="dark-content" />
      <View style={{padding: 20, paddingTop: 30, flex: 1}}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={e => submit(e)}>
            {({handleSubmit, values}) => (
              <>
                <Text style={styles.label}>Email </Text>
                <Field name="email">
                  {({
                    field: {name, onBlur, onChange},
                    form: {touched, errors, setFieldTouched},
                  }: any) => (
                    <>
                      <TextInput
                        onChangeText={e => onChange(name)(e)}
                        onBlur={() => {
                          setFieldTouched(name);
                          onBlur(name);
                        }}
                        placeholder="Enter your email"
                        placeholderTextColor={'grey'}
                        style={{
                          backgroundColor: '#FFF',
                          color: 'black',
                          fontSize: 14,
                          borderRadius: 10,
                          padding: 12,
                        }}
                        returnKeyType="send"
                      />
                      {errors[name] && touched[name] && (
                        <Text
                          maxFontSizeMultiplier={1.5}
                          style={{
                            color: 'red',
                            marginLeft: 5,
                            marginTop: 3,
                          }}>
                          {errors[name]}
                        </Text>
                      )}
                    </>
                  )}
                </Field>
                <Button
                  style={styles.button}
                  buttonColor="#DE5B48"
                  textColor="white"
                  onPress={() => handleSubmit()}>
                  Send
                </Button>
              </>
            )}
          </Formik>
          <View className="self-center mt-6">
            <View className="flex-row mb-2 px-2">
              <Text className="text-[#4A4A4A] text-xs">
                Already have account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-[#5AA97E] text-xs"> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#D7F2FF',
    borderRadius: 15,
    borderColor: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderRadius: 10,
    color: 'black',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  label: {
    color: '#000000',
    fontWeight: '500',
    marginBottom: 6,
    fontSize: 20,
  },
  button: {
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
});
