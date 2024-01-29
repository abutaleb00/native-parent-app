import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DailyAttendance from './DailyAttendance';
import {ParentContext} from '../../utils/context';
import { useContext } from 'react';
const Tab = createMaterialTopTabNavigator();

const AttendanceScreen = () => {
  return (
    <>
      <Tabs />
    </>
  );
};

const Tabs = () => {
  
 
  const {state, dispatch} = useContext(ParentContext);
  let stdobj  = [];
   state.main.profile.students.map((item, index) => {
     stdobj.push({
       id: item.person.id,
       name: item.name,
       component: DailyAttendance,
     });
   });
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: '#F04F3E',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontSize: 15,
          fontWeight: '600',
        },
        tabBarIndicatorStyle: {backgroundColor: '#F04F3E', height: 4},
        tabBarStyle: {
          //   paddingTop: 10,
          shadowColor: '#001d6c6b',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
        },
      }}
      style={{backgroundColor: 'pink'}}>
      {stdobj.map((item, index) => (
        <Tab.Screen name={item.name} component={item.component} key={index} />
      ))}
    </Tab.Navigator>
  );
};
export default AttendanceScreen;