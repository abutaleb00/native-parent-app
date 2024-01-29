import {Image, Pressable, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider, Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ParamList = {
  Params: {
    createdAt: string;
    description: string;
    embeddedLink?: string;
    media: [
      {
        createdAt: string;
        description: string;
        id: number;
        source: string;
        type: string;
        url: string;
      },
    ];
    schoolId: number;
    title: string;
  };
};

const LessonDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<ParamList, 'Params'>>();
  const {description, embeddedLink, media, title} = route.params;
  let urls = [] as string[];
  if (media) {
    media.forEach((m, i) => {
      urls.push(m.url);
    });
  }
  useEffect(() => {
    navigation.setOptions({title: title});
  }, []);

  const viewImages = (type: string, url: string) => {
    if (urls && type === 'IMAGE') {
      const i = urls.indexOf(url);
      navigation.navigate('LessonGalleryView', {images: urls, index: i});
    }
  };
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text style={{color: '#7B7979', marginBottom: 20, fontSize: 15}}>
          {description}
        </Text>
        {embeddedLink && (
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <FontAwesome
              name="link"
              color={'#001D6C'}
              style={{fontSize: 20, marginRight: 10}}
            />
            <Text style={{color: '#001D6C', fontSize: 14}}>{embeddedLink}</Text>
          </View>
        )}
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="camera"
            color={'#001D6C'}
            style={{fontSize: 20, marginRight: 10}}
          />
          <Text style={{color: '#001D6C', fontSize: 14}}>Images</Text>
        </View>
      </View>
      <View style={{marginBottom: 15}}>
        <ScrollView horizontal style={{height: 150, marginLeft: 10}}>
          {media.map((p, i) => (
            <Pressable
              key={i}
              onPress={() => {
                viewImages(p.type, p.url);
              }}>
              {p.type === 'IMAGE' && (
                <Image
                  key={i}
                  source={{uri: p.url}}
                  style={{
                    width: 120,
                    height: 120,
                    margin: 10,
                    borderRadius: 10,
                  }}
                />
              )}
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="paperclip"
            color={'#001D6C'}
            style={{fontSize: 20, marginRight: 10}}
          />
          <Text style={{color: '#001D6C', fontSize: 14}}>Documents</Text>
        </View>
        <View style={{marginTop: 15}}>
          {media.map((m, i) => (
            <View key={i}>
              {m.type === 'DOCUMENT' && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LessonPdfViewer', {
                      url: m.url,
                      title: title,
                    });
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: '#BCBCBCB2',
                        width: 60,
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                      }}>
                      <AntDesign
                        name="pdffile1"
                        color={'white'}
                        style={{fontSize: 40}}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#001D6C',
                          fontSize: 15,
                          marginLeft: 15,
                        }}>
                        {m.url && m.url.split('__')[1]}
                      </Text>
                    </View>
                  </View>
                  <Divider
                    style={{
                      width: '80%',
                      borderWidth: 0.4,
                      borderColor: '#DADADA',
                      marginLeft: 70,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default LessonDetailScreen;
