import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView, Text, View} from 'react-native';
import ReceiptScreen from './ReceiptsScreen';
import BillsScreen from './BillsScreen';

const Tab = createMaterialTopTabNavigator();

const TuitionFeeScreen = () => {
  const data = [{}];
  return (
    <>
      <Tabs />
    </>
  );
};
export default TuitionFeeScreen;

const Tabs = () => {
  const Bills = () => {
    return (
      <>
        {/* <TodaysLesson classId={1} /> */}
        <BillsScreen />
      </>
    );
  };
  const Receipts = () => {
    return (
      <>
        {/* <TodaysLesson classId={2} /> */}
        <ReceiptScreen />
      </>
    );
  };

  const TabList = [
    {
      id: 1,
      name: 'Bills',
      component: Bills,
    },
    {
      id: 2,
      name: 'Receipts',
      component: Receipts,
    },
  ];
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
      {TabList.map((item: any, index: number) => (
        <Tab.Screen name={item.name} component={item.component} key={index} />
      ))}
    </Tab.Navigator>
  );
};
