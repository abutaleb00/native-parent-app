import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import TokenStorage from '../utils/tokenStorage';
import {logout} from '../utils/general';

const CustomDrawer = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const drawerData = [
    {
      icon: '',
      title: '',
      color: '',
    },
  ];
  return (
    <View style={{flex: 1, padding: 15}}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            borderBottomWidth: 1,
            borderColor: '#CCC',
            paddingBottom: 20,
          }}>
          <Image
            source={require('../assets/images/actionButton.png')}
            style={{height: 80, width: 80}}
          />
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 5,
              }}>
              School Name
            </Text>
            <Text
              style={{
                color: '#535763',
                fontSize: 13,
                fontWeight: '400',
                marginBottom: 5,
              }}>
              ashfaksayem@gmail.com
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />

          <View
            style={{
              padding: 20,
              borderTopWidth: 0.5,
              borderColor: 'lightgrey',
              borderRadius: 0,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
              style={{paddingVertical: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Octicons name="shield-lock" size={20} color={'#535763'} />
                <Text
                  style={{
                    color: '#535763',
                    fontSize: 15,
                    fontWeight: '700',
                    marginLeft: 15,
                  }}>
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                logout();
                navigation.replace('Login');
              }}
              style={{paddingVertical: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="log-out-outline" size={20} color={'#535763'} />
                <Text
                  style={{
                    color: '#535763',
                    fontSize: 15,
                    fontWeight: '700',
                    marginLeft: 15,
                  }}>
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
