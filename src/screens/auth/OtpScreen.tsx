import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import authAPI from '../../api/auth';
import BackgroundTimer from 'react-native-background-timer';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';
import {Button} from 'react-native-paper';

type Params = {
  OTP_expiry: number;
  email: string;
};

type Values = {
  otp: string;
};

export default function OtpScreen() {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const {OTP_expiry, email} = route.params as Params;
  const [countDown, setCountDown] = useState<number | undefined>(undefined);
  const [minutes, setMinutes] = useState<number | undefined>(undefined);
  const [seconds, setSeconds] = useState<number | undefined>(undefined);
  const [confirm, setConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (OTP_expiry) {
      setCountDown(OTP_expiry);
    }
  }, []);

  useEffect(() => {
    if (countDown || countDown === 0) {
      const timer = BackgroundTimer.setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      if (countDown === 0 || confirm) {
        BackgroundTimer.clearInterval(timer);
        BackgroundTimer.stopBackgroundTimer();
      }

      const minutes = Math.floor(countDown / 60);
      setMinutes(minutes);
      const seconds = Math.floor(countDown % 60);
      setSeconds(seconds);

      return () => {
        BackgroundTimer.clearInterval(timer);
      };
    }
  }, [countDown]);

  const initialValues: Values = {
    otp: '',
  };
  const validationSchema = Yup.object().shape({
    otp: Yup.string().trim().required('OTP is required.'),
  });

  const submit = async (val: any) => {
    try {
      let body = {
        email: email,
        otp: val.otp,
      };
      setConfirm(true);
      const res = await authAPI.verifyOTP(body);
      if (res.success) {
        nav.navigate('SetNewPasswordScreen', {otp: val.otp, email: email});
      } else {
        setErrorMsg(res.error?.toString());
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resendOTP = async () => {
    try {
      let body = {
        email: email,
      };
      const res = await authAPI.getOTP(body);
      if (res.success) {
        setCountDown(res.data.OTP_expiry);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <KeyboardDismiss>
      <SafeAreaView>
        {/* <TopBar title={'OTP'} showShadow={false}></TopBar> */}
        <View style={{width: '100%', height: '100%', padding: 20}}>
          <View style={styles.container}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submit}>
              {({handleSubmit, values}) => (
                <>
                  {/* <Text style={styles.label}>OTP</Text> */}
                  <View style={{marginBottom: 20}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: 16,
                        marginBottom: 5,
                      }}>
                      An OTP has been sent to your email.
                    </Text>
                  </View>
                  <Field name="otp">
                    {({
                      field: {name, onBlur, onChange},
                      form: {touched, errors, setFieldTouched},
                    }: any) => (
                      <>
                        <TextInput
                          keyboardType="numeric"
                          maxLength={6}
                          onChangeText={e => onChange(name)(e)}
                          onBlur={() => {
                            setFieldTouched(name);
                            onBlur(name);
                          }}
                          placeholder="Enter the OTP"
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
                        {errorMsg && (
                          <Text
                            maxFontSizeMultiplier={1.5}
                            style={{
                              color: 'red',
                              marginLeft: 5,
                              marginTop: 3,
                            }}>
                            {errorMsg}
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
                    Confirm
                  </Button>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 15,
                      marginRight: 5,
                      color: 'red',
                    }}>
                    Need another OTP?
                  </Text>
                  {countDown === 0 ? (
                    <Pressable
                      onPress={() => {
                        resendOTP();
                      }}
                      style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 14,
                          marginRight: 5,
                          textDecorationLine: 'underline',
                        }}>
                        Resend now
                      </Text>
                    </Pressable>
                  ) : (
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 14,
                          marginRight: 5,
                        }}>
                        Resend in
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 14,
                          color: 'red',
                        }}>
                        {minutes?.toString().padStart(2, '0')}:
                        {seconds?.toString().padStart(2, '0')}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </Formik>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardDismiss>
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
