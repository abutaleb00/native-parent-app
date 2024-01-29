import {ScrollView, View, RefreshControl,} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Assesment from './Assesment';
import {ParentContext} from '../../utils/context';
import {useCallback, useContext, useEffect, useState} from 'react';
import assesmentApi from '../../api/assesment';
import {format,parseISO} from 'date-fns'
const Tab = createMaterialTopTabNavigator();
type Props = {};

const AssesmentScreen = (props: Props) => {
  return (
    <>
      <Tabs />
    </>
  );
};

const Tabs = () => {
  const {state, dispatch}: any = useContext(ParentContext);
  const [refreshing, setRefreshing] = useState(false);
  let stdobj: any[] = [];
  state.main.profile.students.map((item: any, index: number) => {
    const DairyA = () => {
      const [assesList, setAssesList]: any[] = useState([]);
    
      const get = useCallback(() => {
        try {
          (async () => {
            const res = await assesmentApi.getAssesment({
              id: item.person.id
            });
            setRefreshing(false)
            setAssesList(res.data);
         
          })();
        } catch {
          (e: any) => {
            setRefreshing(false)
            console.log(e);
          };
        }
      }, []);
      const onRefresh = useCallback(() => {
        setRefreshing(true);
          get();
      }, []);
      useEffect(() => {
        get();
      }, []);
      return (
        <ScrollView
          className="bg-gray-50"
          contentContainerStyle={{flexGrow: 1, margin: 10}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
           
          {assesList.map((data: any, index: number) => (
            <Assesment
              key={index}
              date_={format(data.timestamp,'hh:mm a yyyy-mm-dd')}
              type={data.type}
              desc={data.comment}
              starred={data.star}
            />
          ))}
        </ScrollView>
      );
    };
    stdobj.push({
      id: item.person.id,
      name: item.name,
      component: DairyA,
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
      {stdobj.map((item: any, index: number) => (
        <Tab.Screen name={item.name} component={item.component} key={index} />
      ))}
    </Tab.Navigator>
  );
};

export default AssesmentScreen;
