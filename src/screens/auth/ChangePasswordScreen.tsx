import {Field, Formik, FormikHelpers, FormikValues} from 'formik';
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from '../../components/FormInput';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import authAPI from '../../api/auth';
import TokenStorage from '../../utils/tokenStorage';
import generalAPI from '../../api/general';
import ProfileStorage from '../../utils/profileStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import ErrorDialog from '../../components/ErrorDialog';
import {set} from 'date-fns';

const ChangePasswordScreen = () => {
  const [visible, setVisible] = useState(false);
  const [resposeMessage, setResposeMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // const getAppreciation = async () => {
  //   try {
  //     let res = await generalAPI.getAppreciation(classID);
  //     if (res.success) {
  //       setAppreciationData(res.data);
  //     }
  //   } catch (error) {
  //     console.log('error in appreciation', error);
  //     if (error) {
  //       setResposeMessage(error.toString());
  //       setIsError(true);
  //       showDialog();
  //     }
  //   }
  // };

  type Values = {
    curpassword: string;
    newpassword: string;
    conpassword: string;
  };

  const nav = useNavigation();

  const handleChangePassword = async (values: Values) => {
    const bodydata = {
      oldPassword: md5(values.curpassword),
      newPassword: md5(values.newpassword),
    };

    try {
      let res = await authAPI.changePassword(bodydata);
      if (res.success) {
        console.log(res);
        setResposeMessage('Successfully changed password');
        setIsError(false);
        showDialog();
        //nav.replace('Main');
      } else {
        console.log(res.error);
        setResposeMessage(res.error.toString());
        setIsError(true);
        showDialog();
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setResposeMessage(error.toString());
        setIsError(true);
        showDialog();
      }
    }
  };
  const getProfile = async () => {
    try {
      let res = await generalAPI.getProfile();
      if (res.success) {
        const profileData = res.data;
        await ProfileStorage.set(profileData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues: Values = {
    curpassword: '',
    newpassword: '',
    conpassword: '',
  };
  const validationSchema = Yup.object().shape({
    curpassword: Yup.string().trim().required('Password is required.'),
    newpassword: Yup.string()
      .trim()
      .min(8, 'Minimum 8 characters')
      .matches(/[A-Z]+/, 'At least contains one uppercase character')
      .matches(
        /[\-!@#$%^&[\]._"'()+,/;<>=|?`~{}]+/,
        'At least contains one special character',
      )
      // .matches(/[@$!%*#?&-]+/, 'At least contains one special character')
      .matches(/\d+/, 'At least contains one number')
      .required('New password is required.'),
    conpassword: Yup.string()
      .oneOf([Yup.ref('newpassword')], 'Password does not match')
      .required('Confirm password is required.'),
  });

  return (
    <SafeAreaView style={{padding: 20, flex: 1}}>
      <ErrorDialog
        content={resposeMessage}
        visible={visible}
        hideDialog={hideDialog}
        isError={isError}
      />
      <View style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}>
          {({values, setFieldValue, handleSubmit}) => (
            <>
              <Text style={styles.firstLabel}>Current Password </Text>
              <Field
                name="curpassword"
                component={FormInput}
                placeholder="Current Password"
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={() => nav.navigate('ForgetPassword' as never)}>
                <Text style={styles.firstLabel}>Forgot Password? </Text>
              </TouchableOpacity>
              <Text style={styles.label}>New Password </Text>
              <Field
                name="newpassword"
                component={FormInput}
                style={styles.input}
                placeholder="New Password"
                secureTextEntry={true}
              />
              <Text style={styles.label}>Confirm Password </Text>
              <Field
                name="conpassword"
                component={FormInput}
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Button
                  mode="contained"
                  style={{
                    paddingVertical: 8,
                    borderRadius: 10,
                    backgroundColor: '#001D6C',
                  }}
                  labelStyle={{fontSize: 20, fontWeight: '600'}}
                  textColor="white"
                  onPress={() => handleSubmit()}>
                  Save
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 15,
    borderColor: 'black',
  },
  input: {
    width: '100%',
    fontSize: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#001D6C',
    borderRadius: 10,
    color: '#001D6C',
    paddingHorizontal: 8,
  },
  label: {
    color: '#001D6C',
    fontWeight: '500',
    fontSize: 14,
    paddingTop: 10,
    lineHeight: 14,
    marginBottom: 10,
    marginTop: 32,
  },
  firstLabel: {
    color: '#001D6C',
    fontWeight: '500',
    fontSize: 14,
    paddingTop: 10,
    lineHeight: 14,
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
