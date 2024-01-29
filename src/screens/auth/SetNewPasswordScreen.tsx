import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Modal, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import {useNavigation, useRoute} from '@react-navigation/native';
import authAPI from '../../api/auth';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import md5 from 'md5';
import FormInput from '../../components/FormInput';

type Params = {
  otp: string;
  email: string;
};

type Values = {
  newpassword: string;
  repeatpassword: string;
};

export default function SetNewPasswordScreen() {
  const route = useRoute();
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const {otp, email} = route.params as Params;
  const [showModal, setShowModal] = useState(false);
  const initialValues: Values = {
    newpassword: '',
    repeatpassword: '',
  };
  const validationSchema = Yup.object().shape({
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
    repeatpassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('newpassword')], 'Passwords must match')
      .required('Repeat password is required.'),
  });
  const submit = async (val: any) => {
    try {
      const res = await authAPI.setNewPassword({
        otp: otp,
        email: email,
        password: md5(val.newpassword),
      });
      if (res.success) {
        Keyboard.dismiss();
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          nav.replace('Login');
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardDismiss>
      <SafeAreaView>
        {/* <TopBar title={'Set New Password'} showShadow={false}></TopBar> */}
        <View style={{width: '100%', height: '100%', padding: 20}}>
          <View style={styles.container}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submit}>
              {({handleSubmit, values}) => (
                <>
                  <Text style={styles.label}>New Password</Text>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 43,
                      borderRadius: 10,
                    }}>
                    <Field
                      name="newpassword"
                      component={FormInput}
                      style={styles.input}
                      placeholder="Enter new password"
                      secureTextEntry={true}
                    />
                  </View>
                  <View style={{marginTop: 35, marginBottom: 30}}>
                    <Text style={styles.label}>Repeat Password</Text>
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: 43,
                        borderRadius: 10,
                      }}>
                      <Field
                        name="repeatpassword"
                        component={FormInput}
                        style={styles.input}
                        placeholder="Repeat Password"
                        secureTextEntry={true}
                      />
                    </View>
                  </View>
                  <Button
                    style={styles.button}
                    buttonColor="#DE5B48"
                    textColor="white"
                    onPress={() => handleSubmit()}>
                    Confirm
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </View>
        <Modal
          visible={showModal}
          onDismiss={() => {
            setShowModal(false);
          }}
          contentContainerStyle={{
            height: '25%',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 20,
            paddingHorizontal: 30,
            marginHorizontal: 50,
            alignItems: 'center',
          }}>
          <AntDesign
            name="checkcircleo"
            size={65}
            color={'green'}
            style={{alignSelf: 'center'}}
          />
          <Text style={{textAlign: 'center', marginTop: 20, fontSize: 15}}>
            Your password has been changed successfully!
          </Text>
        </Modal>
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
