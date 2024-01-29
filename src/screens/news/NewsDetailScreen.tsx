import {View, Text, ScrollView, ImageSourcePropType, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Logo from '../../assets/images/edubricklogo.svg';
import {format} from 'date-fns';
import {Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

type EventType = {
  id: number;
  title: string;
  description: string;
  type: string;
  schoolId: number;
  imageUrl: string;
  attachmentUrl: string;
  classId: number;
  postDate: string;
  createdBy: number;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  postToCalander: true;
  personCreatedBy: {
    avatarUrl: string;
    name: string;
  };
};
export default function NewsDetailsScreen() {
  const route = useRoute<any>();
  const {
    id,
    title,
    description,
    type,
    schoolId,
    imageUrl,
    attachmentUrl,
    classId,
    postDate,
    createdBy,
    isPublic,
    startDate,
    endDate,
    postToCalander,
    personCreatedBy,
  } = route.params?.data as EventType;
  // const data: EventType = {
  //   image: require('../../assets/images/avatar.png'),
  //   title: 'Ice Cream Day',
  //   description:
  //     'Hello parents! Just letting you know next week the school will be on public holiday the whole week.  Regards,Teacher Sara.',
  //   createdBy: 'Teacher Sara',
  //   avatar: require('../../assets/images/avatar.png'),
  //   date: new Date(),
  // };
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={{padding: 20}} className="flex-1">
          <View className="items-center justify-center flex-[0.5]">
            {imageUrl ? (
              <Image
                style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: '100%',
                }}
                source={{uri: imageUrl}}
              />
            ) : (
              <Logo className="content-center " />
            )}
          </View>
          <View className="flex-row mt-10 ">
            <View className="flex-1">
              <Text className="text-[#001D6C] text-[20px] font-semibold ">
                {title}
              </Text>
              <Text className="text-[#9C9C9C] text-[12px] font-normal mt-2">
                {format(postDate, 'dd MMM yyyy , HH.mm a')}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Avatar.Image
                // source={require('../../assets/images/avatar.png')}
                source={
                  personCreatedBy.avatarUrl
                    ? {uri: personCreatedBy.avatarUrl}
                    : require('../../assets/images/avatar.png')
                }
                style={{
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  borderColor: 'lightgray',
                }}
                size={35}
              />
              <Text className=" ml-3 text-[12px] text-[#737373] font-normal ">
                {createdBy}
              </Text>
            </View>
          </View>
          <Text className="mt-8 text-[#060F2E] text-[16px] font-normal leading-[22.4px]">
            {description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
