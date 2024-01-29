import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  RefreshControl
} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import type {FC, ReactElement} from 'react';
import React, {useMemo, useState, useCallback, useEffect} from 'react';
import MasonryList from 'reanimated-masonry-list';
import {DatePickerModal} from 'react-native-paper-dates';
import {format} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import generalAPI from '../../api/general';
interface Photo {
  id: string;
  url?: string;
}

interface GalleryItem {
  id: string;
  date: string;
  image: string;
  orientation?: 'portrait' | 'landscape';
  comment?: string;
  timestamp?: string;
}

interface GalleryItemGroup {
  className: string;
  images: GalleryItem[];
  uploadBy: string;
  avatar: string;
}

// const data: Photo[] = [
//   {
//     id: 'id123',
//     imgURL: require('../../assets/images/gallery1.png'),
//   },
//   {
//     id: 'id124',
//     imgURL: require('../../assets/images/gallery2.png'),
//   },
//   {
//     id: 'id125',
//     imgURL: require('../../assets/images/gallery3.png'),
//   },
//   {
//     id: 'id126',
//     imgURL: require('../../assets/images/gallery4.png'),
//   },
// ];

const PhotoCard: FC<{item: string; index: number; data: any}> = ({
  item,
  index,
  data,
}) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PhotoViewer', {data: data});
      }}
      className="mx-1 flex-1 mt-2"
      key={index}>
      <Image
        source={{uri: item}}
        style={{
          height: randomBool ? 150 : 230,
          alignSelf: 'stretch',
          width: '100%',
        }}
        resizeMode="cover"
        className=""
      />
    </TouchableOpacity>
  );
};

const GalleryScreen: FC = () => {
  const [imageData, setImageData] = useState<GalleryItemGroup[]>([]);
  const [imageViewData, setImageViewData] = useState<string[]>([]);
  const [date, setDate] = React.useState(undefined);
  const [refreshing, setRefreshing] = React.useState(false);
  const [openDate, setOpenDate] = useState(false);
  const onDismiss = useCallback(() => {
    setOpenDate(false);
  }, [setOpenDate]);

  const onConfirm = useCallback(
    (params: any) => {
      setOpenDate(false);
      setDate(params.date);
    },
    [setOpenDate, setDate],
  );
  const renderItem: any = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }): ReactElement => {
    return <PhotoCard item={item} index={index} data={imageViewData} />;
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllGallery();
  }, []);
  useEffect(() => {
    getAllGallery();
  }, []);

  const getAllGallery = async () => {
    try {
      let res = await generalAPI.getGallery();

      if (res.success) {
        setRefreshing(false);
        let glist: GalleryItemGroup[] = [];
        let vlist: string[] = [];
        res.data.forEach((classes: any) => {
          let imageSet: GalleryItem[] = [];
          classes.urls.forEach(
            (url: {url: string; description: string}, index: number) => {
              imageSet.push({
                id: classes.media[index],
                date: classes.date,
                image: url.url,
                // orientation: getOrientation(url.url),
              });
              vlist.push(url.url);
            },
          );
          glist.push({
            className: classes.classId,
            images: imageSet,
            uploadBy: classes.uploadBy.name,
            avatar: classes.uploadBy.imageUrl,
          });
        });
        setImageData(glist);
        setImageViewData(vlist);
      } else {
        console.log('Failed ' + JSON.stringify(res));
      }
    } catch (error) {
      setRefreshing(false);
      console.log('error ', error);
    }
  };

  console.log(imageViewData);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar />
      <View className="w-100 mx-3" style={{marginVertical: 30}}>
        <Text className="z-50 bg-[#F4F5F8] w-9 text-center ml-3" style={{}}>
          Date
        </Text>
        <View className="w-full flex flex-row -mt-2 z-40">
          <TextInput
            onPressIn={() => setOpenDate(true)}
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
            readOnly
            placeholder="Choose A Date"
            value={date ? `${format(new Date(date!), 'dd/MM/yy')}` : ''}
          />
          <TouchableOpacity
            onPress={() => setOpenDate(true)}
            className="bg-red-200 rounded-full py-1 px-1"
            style={{marginLeft: -50, marginTop: 10, marginBottom: 10}}>
            <MaterialCommunityIcons name="calendar" color="#4A4A4A" size={20} />
          </TouchableOpacity>
        </View>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={openDate}
          onDismiss={onDismiss}
          date={date}
          onConfirm={onConfirm}
        />
        <Text className="text-[#001D6C] text-base -mb-2 ml-2">
          13th June 2023 ,
        </Text>
      </View>
      <View className="flex-1">
        <MasonryList
          keyExtractor={(item: Photo, index): string => index.toString()}
          ListHeaderComponent={<View />}
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignSelf: 'stretch',
          }}
          numColumns={2}
          data={imageViewData}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default GalleryScreen;
