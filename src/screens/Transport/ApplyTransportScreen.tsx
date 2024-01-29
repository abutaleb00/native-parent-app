import {ScrollView, View, TouchableOpacity, RefreshControl} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useCallback, useEffect, useState, useContext} from 'react';
import transportAPI from '../../api/transport';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import TodaysLesson from './TodaysLesson';
import UpComing from './UpComing';
import AuthorizedPickUp from './AuthorizedPickUp';
import LoaderModal from '../../components/LoaderModal';
import {ParentContext} from '../../utils/context';
const Tab = createMaterialTopTabNavigator();

const ApplyTransportScreen = () => {
  return (
    <>
      <Tabs />
    </>
  );
};

const Tabs = () => {
  const {state, dispatch}: any = useContext(ParentContext);
  const route: any = useRoute();
  const [data_, setData_]: any[] = useState([]);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState(false);
  if (route.params) {
    data_.push(route.params.upcoming);
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData()
  }, []);
  const getData = () =>{
    try {
      (async () => {
        if (data_.length === 0) {
          setLoading(true);
          const res: any = await transportAPI.get(
            state.main.profile.students[0].klassId,
          );
          setData_(res.data);
          setLoading(false);
          setRefreshing(false)
        }
      })();
    } catch (e) {
      setRefreshing(false)
      console.log(e);
    }
  }
  useEffect(() => {
    getData()
  }, []);
  const UpComingTab = () => {
    return (
      <>
        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        contentContainerStyle={{flexGrow: 1}}>
          {/* <TodaysLesson classId={1} /> */}
          <UpComing data_={data_} />
        </ScrollView>
        <TouchableOpacity
          style={{
            elevation: 2,
            shadowColor: '#000', // Shadow color
            shadowOffset: {width: 0, height: 2}, // Shadow offset
            shadowOpacity: 0.2, // Shadow opacity
            shadowRadius: 2, // Shadow radius
          }}
          className="w-12 h-12 rounded-full text-center items-center justify-center bg-[#001D6C] absolute bottom-10 right-5"
          onPress={() =>
            navigation.navigate('ChildList', {next: 'TransPortRequest'})
          }>
          <MaterialCommunityIcons name="plus" color="#ffffff" size={30} />
        </TouchableOpacity>
      </>
    );
  };
  const AuthorizedTab = () => {
    return (
      <>
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}> */}
        {/* <TodaysLesson classId={2} /> */}
        <AuthorizedPickUp />
        {/* </ScrollView> */}
        <TouchableOpacity
          style={{
            elevation: 2,
            shadowColor: '#000', // Shadow color
            shadowOffset: {width: 0, height: 2}, // Shadow offset
            shadowOpacity: 0.2, // Shadow opacity
            shadowRadius: 2, // Shadow radius
          }}
          className="w-12 h-12 rounded-full text-center items-center justify-center bg-[#001D6C] absolute bottom-10 right-5"
          onPress={() => navigation.navigate('AddAuthorized')}>
          <MaterialCommunityIcons name="plus" color="#ffffff" size={30} />
        </TouchableOpacity>
      </>
    );
  };
  const TabList = [
    {
      id: 1,
      name: 'Upcoming',
      component: UpComingTab,
    },
    {
      id: 2,
      name: 'Authorized Pick-Up',
      component: AuthorizedTab,
    },
  ];
  if (loading) {
    return <LoaderModal />;
  } else
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
        {TabList.map((item: any, index: number) => (
          <Tab.Screen name={item.name} component={item.component} key={index} />
        ))}
      </Tab.Navigator>
    );
};
export default ApplyTransportScreen;
