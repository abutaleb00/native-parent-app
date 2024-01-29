import {View, Text, Dimensions, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import DashboardScreen from './DashboardScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApplyTransportScreen from '../screens/transport/ApplyTransportScreen';
import NotifyAbsent from '../screens/absent/NotifyAbsentScreen';
import HealthInfoScreen from '../screens/health/HealthInfoScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import AssesmentScreen from '../screens/assesment/AssesmentScreen';
import LessonScreen from '../screens/lesson/LessonScreen';
import AppreciationBoardScreen from '../screens/appreciation/AppreciationBoardScreen';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ProgressReportScreen from '../screens/progressReport/ProgressReportScreen';
import TuitionFeeScreen from '../screens/tuitionfee/TuitionFeeScreen';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const Drawer = createDrawerNavigator();

export default function MainScreen() {
  const [activeRoute,setActiveRoute]:any = React.useState('Diary')
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',

        drawerType: 'front',
        headerStyle: {
          height:
            Dimensions.get('window').height /
            (Platform.OS === 'ios' ? 7.5 : 12),
          elevation: 2,
          shadowColor: '#001d6c6b',
          shadowOffset: {width: 0, height: 0.5},
          shadowRadius: 2,
          borderBottomWidth: 0.5,
        },
        headerTitleStyle: {
          color: '#001D6C',
          fontSize: 18,
          fontWeight: '500',
        },
        headerTintColor: '#001D6C',
        drawerActiveBackgroundColor: '#001d6c',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#535763',
        sceneContainerStyle: {backgroundColor: '#FFF'},
        drawerStyle: {
          width: Dimensions.get('window').width / 1.3,
        },
        drawerLabelStyle: {
          // color: '#535763',
          fontSize: 15,
          fontWeight: '700',
          marginLeft: -17,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <View className="flex-row mr-4">
              <MaterialCommunityIcons
                name="bell-outline"
                color="#001D6C"
                size={24}
              />
              <View className="bg-red-600 rounded-full w-4 h-4 -ml-3 -mt-1">
                <Text className="text-white px-1 py-1 text-center text-xs -mt-1">
                  7
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen
        name="Dairy"
        options={{
          
          headerTitle: activeRoute,

          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="grid"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#FC5C5C',
                }}></View>
            </>
          ),
        }}
        listeners={({route, navigation}) => ({
          state: () => {
            const subRoute = getFocusedRouteNameFromRoute(route);
setActiveRoute(subRoute)
            if (subRoute?.toLowerCase() === 'home') {
              navigation.setOptions({
                headerShadowVisible: false,
              });
            } else {
              navigation.setOptions({
                headerShadowVisible: true,
                
              });
            }
            // Your logic here //
          },
        })}
        component={DashboardScreen}
      />
      <Drawer.Screen
        name="HealthInfo"
        component={HealthInfoScreen}
        options={{
          headerTitle: 'Health Info',
          drawerLabel: 'Health Info',
          headerShadowVisible: false,
          sceneContainerStyle: {backgroundColor: '#F2F6F9'},
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="medkit-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#FCE15C',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="NotifyAbsent"
        component={NotifyAbsent}
        options={{
          title: 'Notify Absent',
          drawerLabel: 'Notify Absent',
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="leaf-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#B1E5FC',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="ApplyTransport"
        component={ApplyTransportScreen}
        options={{
          title: 'Transportation',
          drawerLabel: 'Apply Transport',
          headerShadowVisible: false,
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="bus-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#FFBC99',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{
          title: 'Attendance',
          drawerLabel: 'Attendance',
          headerShadowVisible: false,
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="scan-circle-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#FB9B9B',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Appreciation"
        component={AppreciationBoardScreen}
        options={{
          title: 'Appreciation Board',
          drawerLabel: 'Appreciation Board',
          headerShadowVisible: false,
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="heart-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#D1E4FC',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          drawerLabel: 'Calendar',
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="calendar"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#B1E5FC',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="LessonPlan"
        component={LessonScreen}
        options={{
          title: 'Lesson Plan',
          drawerLabel: 'Lesson Plan',
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="book-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#9CD8D7',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Assesment"
        component={AssesmentScreen}
        options={{
          title: 'Assesment',
          drawerLabel: 'Assesment',
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="ribbon-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#FFD4AC',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="ProgressReport"
        component={ProgressReportScreen}
        options={{
          title: 'Progress Report',
          // drawerLabel: 'ProgressReport',
          headerShadowVisible: false,
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="school-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#F7CC73',
                }}></View>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="TuitionFee"
        component={TuitionFeeScreen}
        options={{
          title: 'Tuition Fee',
          // drawerLabel: 'ProgressReport',
          headerShadowVisible: false,
          headerRight: () => <></>,
          drawerIcon: ({focused}) => (
            <>
              <Ionicons
                name="card-outline"
                size={20}
                color={focused ? '#fff' : '#535763'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: '#D1E4FC',
                }}></View>
            </>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
