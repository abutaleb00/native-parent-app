import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {PropsWithChildren} from 'react';
import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/gallery/GalleryScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import NewsScreen from '../screens/news/NewsScreen';
import MenuButton from '../components/MenuButton';
import UserProfilePic from '../components/UserProfilePic';
import DairyScreen from '../screens/dairy/DairyScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CurrentImageURL} from '../utils/context';
const Tab = createBottomTabNavigator();

function ActionButtonScreen() {
  return <View style={{backgroundColor: 'pink', flex: 1}}></View>;
}
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {...state, currentImageURL: action.payload};
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const [state_, dispatch_] = React.useReducer(reducer, {
    currentImageURL: null,
  });
  return (
    <CurrentImageURL.Provider value={{state_, dispatch_}}>
      <Tab.Navigator
        initialRouteName="Diary"
        screenOptions={{
          tabBarStyle: {
            height: 80,
            paddingBottom: 20,
          },
          tabBarActiveTintColor: '#001D6C',
          tabBarLabelStyle: {fontSize: 12},
          tabBarAllowFontScaling: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Diary"
          component={DairyScreen}
          options={{
            title: 'Dairy',
            headerTitle: 'Dairy',
            tabBarIcon: ({size, focused, color}) => {
              return (
                <MaterialCommunityIcons
                  name="home-outline"
                  color="#001D6C"
                  size={24}
                />
              );
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            title: 'Gallery',
            headerTitle: 'Gallery',
            tabBarIcon: ({size, focused, color}) => {
              return (
                <View className="flex-row">
                  <MaterialCommunityIcons
                    name="image-multiple-outline"
                    color="#001D6C"
                    size={24}
                  />
                  <View className="bg-red-600 rounded-full w-4 h-4 -ml-3 -mt-2">
                    <Text className="text-white px-1 py-1 text-center text-xs -mt-1">
                      7
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="ActionButton"
          component={ActionButtonScreen}
          options={{
            tabBarButton: () => <UserProfilePic />,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return (
                <View className="flex-row">
                  <MaterialCommunityIcons
                    name="message-outline"
                    color="#001D6C"
                    size={24}
                  />
                  <View className="bg-red-600 rounded-full w-4 h-4 -ml-3 -mt-2">
                    <Text className="text-white px-1 py-1 text-center text-xs -mt-1">
                      7
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return (
                <View className="flex-row">
                  <MaterialCommunityIcons
                    name="menu"
                    color="#001D6C"
                    size={24}
                  />
                  <View className="bg-red-600 rounded-full w-4 h-4 -ml-3 -mt-2">
                    <Text className="text-white px-1 py-1 text-center text-xs -mt-1">
                      7
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </CurrentImageURL.Provider>
  );
}
