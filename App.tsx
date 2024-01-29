import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import MainScreen from './src/navigations/MainScreen';
import ForgetPasswordScreen from './src/screens/auth/ForgetPasswordScreen';
import ChangePassword from './src/screens/auth/ChangePassword';
import OnboardingOneScreen from './src/screens/onboarding/OnboardingOneScreen';
import OnboardingTwoScreen from './src/screens/onboarding/OnboardingTwoScreen';
import OnboardingThreeScreen from './src/screens/onboarding/OnboardingThreeScreen';
import NotificationScreen from './src/screens/notifications/NotificationScreen';
import AddAuthorizedPickUp from './src/screens/transport/AddAuthorizedPickUp';
import ChildList from './src/screens/transport/ChildList';
import PhotoViewer from './src/screens/gallery/PhotoViewer';
import HealthChildList from './src/screens/health/ChildList';
import CreateMedication from './src/screens/health/CreateMedication';
import SelectAllergies from './src/screens/health/SelectAllergies';
import AddAllergy from './src/screens/health/AddAllergy';
import AbsentChildListScreen from './src/screens/absent/AbsentChildListScreen';
import ApplyForAbsent from './src/screens/absent/ApplyForAbsent';
import {en, registerTranslation} from 'react-native-paper-dates';
import NewsDetailsScreen from './src/screens/news/NewsDetailScreen';
import TransPortRequest from './src/screens/transport/TransPortRequest';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FeeDetailScreen from './src/screens/tuitionfee/FeeDetailsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from './src/utils/rootNavigation';
import OtpScreen from './src/screens/auth/OtpScreen';
import SetNewPasswordScreen from './src/screens/auth/SetNewPasswordScreen';
import {ParentContext} from './src/utils/context';
import {createContext, useState, useReducer} from 'react';
import ChangePasswordScreen from './src/screens/auth/ChangePasswordScreen';
import LessonDetailScreen from './src/screens/lesson/LessonDetailScreen';
import LessonGalleryView from './src/screens/lesson/LessonGalleryView';
import LessonPdfViewer from './src/screens/lesson/LessonPdfViewer';
registerTranslation('en', en);

const Stack = createStackNavigator();
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {...state, main: action.payload};
    default:
      return state;
  }
};
export default function App() {
  const [state, dispatch] = useReducer(reducer, {main: null});
  let context = {state, dispatch};
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ParentContext.Provider value={context}>
      <NavigationContainer ref={navigationRef}>
        <PaperProvider
          settings={{
            rippleEffectEnabled: true,
          }}>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                color: '#001D6C',
                fontSize: 18,
                fontWeight: '500',
              },
              headerBackTitleVisible: false,
              headerShadowVisible: true,
              headerTintColor: '#001D6C',

              headerTitleAlign: 'center',

              headerStyle: {
                elevation: 3,
                shadowOpacity: 3,
                borderBottomWidth: 0.75,
              },
              headerBackImage: () => <Ionicons name="chevron-back" size={30} />,
            }}
            initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: 'Forgot Password',
                //headerLargeTitleShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="Otp"
              component={OtpScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: 'OTP',
                //headerLargeTitleShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="SetNewPasswordScreen"
              component={SetNewPasswordScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: 'Set New Password',
                //headerLargeTitleShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OnboardingOne"
              component={OnboardingOneScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OnboardingTwo"
              component={OnboardingTwoScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OnboardingThree"
              component={OnboardingThreeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationScreen}
              options={{}}
            />
            <Stack.Screen
              name="AddAuthorized"
              component={AddAuthorizedPickUp}
              options={{
                title: 'Add Authorized Pick-up',
              }}
            />
            <Stack.Screen
              name="ChildList"
              component={ChildList}
              options={{
                title: 'Select Your Child',
              }}
            />
            <Stack.Screen
              name="TransPortRequest"
              component={TransPortRequest}
              options={{
                title: 'Transport Request',
              }}
            />
            <Stack.Screen
              name="AbsentChildList"
              component={AbsentChildListScreen}
              options={{
                title: 'Select Your Child',
              }}
            />
            <Stack.Screen
              name="ApplyForAbsent"
              component={ApplyForAbsent}
              options={{
                title: 'Apply For Absent',
              }}
            />
            <Stack.Screen
              name="HealthChildList"
              component={HealthChildList}
              options={{
                title: 'Select Your Child',
              }}
            />
            <Stack.Screen
              name="CreateMedication"
              component={CreateMedication}
              options={{
                title: 'Create Medication',
              }}
            />
            <Stack.Screen
              name="SelectAllergies"
              component={SelectAllergies}
              options={{
                title: 'Select Allergen',
              }}
            />
            <Stack.Screen
              name="AddAllergy"
              component={AddAllergy}
              options={{
                title: 'Add Allergen',
              }}
            />
            <Stack.Screen
              name="NewsDetails"
              component={NewsDetailsScreen}
              options={{
                title: 'News & Event',
              }}
            />
            <Stack.Screen
              name="PhotoViewer"
              component={PhotoViewer}
              options={{
                title: 'Photo Viewer',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{
                title: 'Change Password',
                headerShown: true,
                headerBackTitleVisible: false,
                headerShadowVisible: true,
                headerTintColor: '#001D6C',

                headerTitleAlign: 'center',

                headerStyle: {
                  elevation: 3,
                  shadowOpacity: 3,
                  borderBottomWidth: 0.75,
                },
                headerBackImage: () => (
                  <Ionicons name="chevron-back" size={30} />
                ),
              }}
              />
              <Stack.Screen
              name="FeeDetails"
              component={FeeDetailScreen}
              options={{
                title: 'Invoice',
                headerShown: true,
                headerBackTitleVisible: false,
                headerShadowVisible: true,
                headerTintColor: '#001D6C',
              }}
            />
            <Stack.Screen
              name="LessonDetailScreen"
              component={LessonDetailScreen}
              options={{
                title: '',
              }}
            />
            <Stack.Screen
              name="LessonGalleryView"
              component={LessonGalleryView}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LessonPdfViewer"
              component={LessonPdfViewer}
              options={{
                title: '',
              }}
            />
            </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </ParentContext.Provider>
    </GestureHandlerRootView>
  );
}


