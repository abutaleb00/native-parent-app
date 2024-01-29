import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import TodaysLesson from './TodaysLesson';
import TodaysDiary from './TodaysDairy';
import {ParentContext, CurrentImageURL} from '../../utils/context';
import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const DairyScreen = () => {

  return (
    <>
      <Tabs />
    </>
  );
};

const Tabs = () => {
  const {state, dispatch}: any = useContext(ParentContext);

  const route: any = useRoute();
  //console.log(route)

  const DairyA = () => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
        {/* <TodaysLesson classId={1} /> */}
        <TodaysDiary />
      </ScrollView>
    );
  };

  let stdobj: any[] = [
    {
      id: 1,
      name: 'Kyle',
      component: DairyA,
    },
    {
      id: 2,
      name: 'Cassandra',
      component: DairyA,
    },
  ];

  let updatedobj: any[] = []

  state.main?.profile.students.map((item: any, index: number) => {
    const Dairy = () => {
      const route: any = useRoute();

      return (
      
        
          <TodaysDiary
            StudentId={item.person.studentId}
            KlassId={item.klassId}
            currentImageURL={item.avatarUrl}
          />
       
      );
    };
    updatedobj.push({
      id: item.person.id,
      name: item.name,
      component: Dairy,
    });
    stdobj = updatedobj;
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
      {stdobj.map((item: any, index: number) => (
        <Tab.Screen name={item.name} component={item.component} key={index} />
      ))}
    </Tab.Navigator>
  );
};
export default DairyScreen;
