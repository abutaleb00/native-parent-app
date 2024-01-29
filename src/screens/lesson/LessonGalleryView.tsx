import {Text, TouchableOpacity, View} from 'react-native';
import Gallery from 'react-native-awesome-gallery';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const LessonGalleryView = ({route}: {route: any}) => {
  const {images, index} = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const nav = useNavigation();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            top: 10,
            zIndex: 10,
          }}>
          <TouchableOpacity>
            <Icon
              name="close"
              size={24}
              color="black"
              onPress={() => nav.goBack()}
            />
          </TouchableOpacity>
        </View>
        <Gallery
          style={{flex: 1, backgroundColor: 'black'}}
          data={images}
          initialIndex={index}
          onSwipeToClose={() => nav.goBack()}
          onIndexChange={newIndex => {
            setCurrentIndex(newIndex + 1);
          }}></Gallery>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LessonGalleryView;
