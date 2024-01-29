// import { RootStackParamList } from '@/screens/params';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TabActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import env from 'env.json';

export const navigationRef =
  createNavigationContainerRef<NativeStackNavigationProp<any>>();

export function navigate(name: any, params?: any, isReplace?: boolean) {
  if (navigationRef.isReady()) {
    if (params) {
      if (params.id) {
        navigationRef.navigate(name, {id: params.id});
      } else {
        if (isReplace) {
          navigationRef.reset({
            index: 0,
            routes: [{name: name}],
          });
        } else {
          navigationRef.navigate(name);
        }
      }
    } else {
      if (isReplace) {
        navigationRef.reset({
          index: 0,
          routes: [{name: name}],
        });
      } else {
        navigationRef.navigate(name);
      }
    }
  }
}

export default {
  navigate,
};
