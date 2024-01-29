import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';

type ParamList = {
  Params: {
    url: string;
    title: string;
  };
};

const LessonPdfViewer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<ParamList, 'Params'>>();
  const doc = route.params.url;
  const title = route.params.title;
  useEffect(() => {
    navigation.setOptions({title: title});
  }, []);
  return (
    <View style={{flex: 1}}>
      {doc ? (
        <Pdf
          trustAllCerts={false}
          source={{
            uri: doc,
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>No PDF to show</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default LessonPdfViewer;
