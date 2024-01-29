import {ScrollView, View,  RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Lesson from './Lesson';
import {ParentContext} from '../../utils/context';
import {useContext} from 'react';
import lessonAPI from '../../api/lesson';
import {useCallback, useEffect, useState} from 'react';
import ProfileStorage from '../../utils/profileStorage';

const Tab = createMaterialTopTabNavigator();
type Props = {};

const LessonScreen = () => {
  const [lessonList, setLessonList] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData()
  }, []);
  const getData = useCallback(async () => {
    const res = await lessonAPI.getLessonScheduleList();
    if (res.success) {
      setRefreshing(false);
      setLessonList(res.data);
    }
  }, [lessonList]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <><ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
        {Tabs(lessonList)}
    </ScrollView>
    
      {/* <Tabs /> */}
    </>
  );
};

const Tabs = (lesson: any) => {
  
  const DairyA = () => {


    return (
      <ScrollView
     
        contentContainerStyle={{
          flexDirection: 'row',
          padding: 20,
          paddingTop: 40,
          gap: 20,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        {lesson.map((data: any, index: number) => (
          // <></>
          <View key={index}>
            <Lesson
              // imgSrc={data.lesson.media[0].url}
              // name={data.lessonTitle}
              data={data.lesson}
            />
          </View>
        ))}
      </ScrollView>
    );
  };
  const DairyB = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          padding: 20,
          paddingTop: 40,
          gap: 20,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        {lesson.map((data: any, index: number) => (
          // <></>
          <View key={index}>
            <Lesson
              // imgSrc={data.lesson.media[0].url}
              // name={data.lessonTitle}
              data={data.lesson}
            />
          </View>
        ))}
      </ScrollView>
    );
  };
  const DairyC = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          padding: 20,
          paddingTop: 40,
          gap: 20,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        {lesson.map((data: any, index: number) => (
          // <></>
          <View key={index}>
            <Lesson
              // imgSrc={data.lesson.media[0].url}
              // name={data.lessonTitle}
              data={data.lesson}
            />
          </View>
        ))}
      </ScrollView>
    );
  };
  const TabList = [
    {
      id: 1,
      name: 'Kyle',
      component: DairyA,
    },
    {
      id: 2,
      name: 'Cassandra',
      component: DairyB,
    },
    {
      id: 2,
      name: 'Gary',
      component: DairyC,
    },
  ];
  const {state, dispatch}: any = useContext(ParentContext);
  let stdobj: any[] = [];
  state.main.profile.students.map((item: any, index: number) => {
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

export default LessonScreen;
