import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileStorage = {
  get: async () => {
    try {
      const profile = await AsyncStorage.getItem('profile').then(function (
        value: any,
      ) {
        return JSON.parse(value);
      });

      return {profile};
    } catch (e) {}
  },
  set: async (profile: any) => {
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(profile));
    } catch (e) {}
  },
  delete: async () => {
    try {
      await AsyncStorage.removeItem('profile');
    } catch (e) {}
  },
};

export default ProfileStorage;
