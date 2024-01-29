import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,

} from 'react-native';
import React, {useCallback, useEffect, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import transportAPI from '../../api/transport';
import {ParentContext} from '../../utils/context';
export default function AuthorizedPickUp() {
  const {state, dispatch}: any = useContext(ParentContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [data, setData]: any[] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const route: any = useRoute();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get();
  }, []);
  const get = useCallback(() => {
    (async () => {
      try {
        const res = await transportAPI.getAuthorized(
          state.main.profile.students[0].person.id,
        );
        setData(res.data);

        setRefreshing(false);
        if (route.params) {
          setData((prev: any) => {
            prev.push(route.params);
            return [...prev];
          });
        }
      } catch {
        setRefreshing(false);
        (e: any) => console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    get();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View className="flex-1 my-2">
        {data?.length > 0 ? (
          data.map((item: any, index: number) => (
            <View
              style={{
                elevation: 3,
                shadowColor: '#000', // Shadow color
                shadowOffset: {width: 0, height: 2}, // Shadow offset
                shadowOpacity: 0.2, // Shadow opacity
                shadowRadius: 2, // Shadow radius
              }}
              className="flex-row justify-between mt-4 px-4 border bg-white rounded-2xl border-gray-200 mx-5 py-5 "
              key={index}>
              <Image
                className="w-14 h-14 rounded-full"
                source={
                  item.avatarUrl !== null
                    ? {uri: item.avatarUrl}
                    : require('../../assets/images/transport.png')
                }
              />

              <View className="w-[70%]">
                <Text className="text-[#001D6C] font-[500] text-lg">
                  {item?.name}
                </Text>

                <Text className="text-[#001D6C] text-sm">
                  ID No : {item?.idNumber}
                </Text>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await transportAPI.deleteAuthorized({
                      id: state.main.profile.students[1].person.id,
                      idNumber: item?.idNumber,
                    });
                    get();
                  } catch {
                    (e: any) => {
                      console.log(e);
                    };
                  }
                }}
                className="rounded-full">
                <MaterialCommunityIcons
                  className="right"
                  name="trash-can-outline"
                  color="red"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View className="flex-1 justify-center items-center">
            <Image
              className="w-40"
              source={require('../../assets/images/transport.png')}
              resizeMode="contain"
            />
            <Text className="text-xs text-[#999999] mt-5">
              Click the plus button to request for transportation
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
