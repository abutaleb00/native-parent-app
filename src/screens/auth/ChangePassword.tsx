import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export default function ChangePassword() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 30,
          backgroundColor: 'white',
        }}>
        <View className="flex mx-4">
          <View className="mx-3">
            <Text className="my-3 text-[#001D6C]" style={{}}>
              Current Password
            </Text>
            <View className="w-full flex flex-row">
              <TextInput
                style={{
                  marginHorizontal: 2,
                  borderRadius: 11,
                  fontSize: 15,
                  height: 50,
                  padding: Platform.OS === 'ios' ? 15 : 10,
                  width: '100%',
                  backgroundColor: '#FFF',
                  borderColor: '#001D6C80',
                  borderWidth: 1,
                  color: 'black',
                }}
                placeholderTextColor={'#8E8E8E'}
                placeholder="Choose A Date"
                secureTextEntry
                value="123456"
              />
            </View>
            <TouchableOpacity
              className="mt-1 mb-3"
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text className="text-[#001D6C] font-semibold pl-1">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mx-3">
            <Text className="my-3 text-[#001D6C]" style={{}}>
              New Password
            </Text>
            <View className="w-full flex flex-row">
              <TextInput
                style={{
                  marginHorizontal: 2,
                  borderRadius: 11,
                  fontSize: 15,
                  height: 50,
                  padding: Platform.OS === 'ios' ? 15 : 10,
                  width: '100%',
                  backgroundColor: '#FFF',
                  borderColor: '#001D6C80',
                  borderWidth: 1,
                  color: 'black',
                }}
                placeholderTextColor={'#8E8E8E'}
                placeholder="New Password"
                secureTextEntry
              />
            </View>
          </View>
          <View className="mx-3">
            <Text className="my-3 text-[#001D6C]" style={{}}>
              Confirm new password
            </Text>
            <View className="w-full flex flex-row">
              <TextInput
                style={{
                  marginHorizontal: 2,
                  borderRadius: 11,
                  fontSize: 15,
                  height: 50,
                  padding: Platform.OS === 'ios' ? 15 : 10,
                  width: '100%',
                  backgroundColor: '#FFF',
                  borderColor: '#001D6C80',
                  borderWidth: 1,
                  color: 'black',
                }}
                placeholderTextColor={'#8E8E8E'}
                placeholder="Confirm new password"
                secureTextEntry
              />
            </View>
          </View>

          <View className="mx-3 mt-50">
            <TouchableOpacity
              onPress={() => navigation.navigate('NotifyAbsent')}
              className="bg-[#001D6C] py-3 rounded-md my-2 mt-10">
              <Text className="text-center text-white font-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
