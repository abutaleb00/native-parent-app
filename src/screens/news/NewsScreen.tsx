import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DashedLine from '../../components/DashedLine';
import {Avatar} from 'react-native-paper';
import {format} from 'date-fns';
import BlueDot from '../../assets/images/bluedot.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import generalAPI from '../../api/general';
import Logo from '../../assets/images/edubricklogo.svg';
import ProfileStorage from '../../utils/profileStorage';

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

export default function NewsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [timelineData, setTimelineData] = useState<EventType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNews()
  }, []);
  useFocusEffect(
    useCallback(() => {
      getNews();
    }, []),
  );
  // useEffect(() => {
  //   getNews();
  // }, []);

  const getNews = async () => {
    try {
      const res = await generalAPI.getNews();
      if (res.success) {
        setRefreshing(false);
        setTimelineData(res.data);
      }
    } catch (err) {
      setRefreshing(false);
      console.log('news--- ', err);
    }
  };
  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 30,
        backgroundColor: 'white',
      }}>
      <Timeline timelineData={timelineData} navigation={navigation} />
    </ScrollView>
  );
}

const Timeline = ({navigation,timelineData}:any) => {
 

  return (
    <View style={{marginHorizontal: 20}}>
      {timelineData.length > 0 &&
        timelineData.map((item: EventType, index:number) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate('NewsDetails', {data: timelineData[index]})
            }>
            <View style={{flexDirection: 'row'}}>
              {/* <View
              style={{
                width: 20,
                // height: 5,
                borderRadius: 15,
                backgroundColor: '#001D6C',
              }}
            /> */}
              {/* <Image
              className="w-[18] h-[18]"
              source={require('../../assets/bluedot.png')}
            /> */}
              <BlueDot width="18" height="18" />
              <View
                style={{
                  marginLeft: 20,
                  flex: 1,
                }}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 18}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    //   borderLeftWidth: 1,
                    // height: '30%',
                    //   height: '100%',
                    backgroundColor: '#001D6C4D',
                    width: 2,
                    flex: index === timelineData.length - 1 ? 0 : 1,
                  }}
                />
              </View>
              <View style={{flex: 1, marginLeft: 20}}>
                {/* <ImageBackground
                source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
                resizeMode="cover"
                style={{width: '100%', height: 150}}
                imageStyle={{borderRadius: 10}}
              /> */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Text numberOfLines={2} style={styles.subtitle}>
                      {item.description}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Avatar.Image
                        source={
                          item.personCreatedBy.avatarUrl
                            ? {uri: item.personCreatedBy.avatarUrl}
                            : require('../../assets/images/avatar.png')
                        }
                        style={{
                          backgroundColor: 'white',
                          borderWidth: 0.5,
                          borderColor: 'lightgray',
                        }}
                        size={30}
                      />
                      <Text style={styles.name}>{item.createdBy}</Text>
                    </View>
                    <Text style={styles.date}>
                      {format(item.postDate, 'dd MMM yyyy , HH.mm a')}
                    </Text>
                  </View>
                  <View style={{marginTop: '-18%'}}>
                    {item.imageUrl && (
                      <Image
                        style={{
                          resizeMode: 'cover',
                          width: 100,
                          height: 100,
                        }}
                        source={{uri: item.imageUrl}}
                      />
                    )}
                  </View>
                </View>
                <DashedLine />
              </View>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#A6A4A4',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 15,
    marginTop: 5,
  },
  title: {
    color: '#001D6C',
    fontSize: 18,
    fontWeight: '500',
  },
  name: {
    color: '#737373',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
    alignSelf: 'center',
  },
  date: {
    color: '#9C9C9C',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 15,
  },
});
