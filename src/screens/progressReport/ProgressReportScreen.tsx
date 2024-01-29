import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView, Text, View} from 'react-native';
import ReportScreen from './ReportScreen';
import {ParentContext} from '../../utils/context';
import {useContext} from 'react';
const Tab = createMaterialTopTabNavigator();

const ProgressReportScreen = () => {
  const data = [{}];
  return (
    <>
      <Tabs />
    </>
  );
};
export default ProgressReportScreen;

const Tabs = () => {
  const StudentA = () => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* <TodaysLesson classId={1} /> */}
        <ReportScreen />
      </ScrollView>
    );
  };
  const StudentB = () => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
        {/* <TodaysLesson classId={2} /> */}
        <ReportScreen />
      </ScrollView>
    );
  };
  const StudentC = () => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
        {/* <TodaysLesson classId={2} /> */}
        <ReportScreen />
      </ScrollView>
    );
  };
  const TabList = [
    {
      id: 1,
      name: 'Kyle',
      component: StudentA,
    },
    {
      id: 2,
      name: 'Cassandra',
      component: StudentB,
    },
    {
      id: 2,
      name: 'Gary',
      component: StudentC,
    },
  ];
  const {state, dispatch}: any = useContext(ParentContext);
  let stdobj: any[] = [];
  state.main.profile.students.map((item: any, index: number) => {
    stdobj.push({
      id: item.person.id,
      name: item.name,
      component: StudentA,
    });
  });
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      screenOptions={{
        tabBarScrollEnabled: TabList.length > 3 ? true : false,
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
