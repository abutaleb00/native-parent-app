import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal_1 from './Modals/Modal_1';
import Modal_2 from './Modals/Modal_2';
import Ionicons from 'react-native-vector-icons/Ionicons';
var AllergenArr = [
  {
    name: 'Fish',
    src: require('../../assets/images/Allergens/Capa_1.png'),
    selected: false,
    category: 'Animal',
  },
  {
    name: 'Molluscs',
    src: require('../../assets/images/Allergens/Group-2.png'),
    selected: false,
    category: 'Shellfish',
  },
  {
    name: 'Seashell',
    src: require('../../assets/images/Allergens/Group-3.png'),
    selected: false,
    category: 'Shellfish',
  },
  {
    name: 'Nuts',
    src: require('../../assets/images/Allergens/Group-4.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Peanut',
    src: require('../../assets/images/Allergens/Group-5.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Seasame',
    src: require('../../assets/images/Allergens/Group-6.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Eggs',
    src: require('../../assets/images/Allergens/Capa_2.png'),
    selected: false,
    category: 'Others',
  },
  {
    name: 'Milk',
    src: require('../../assets/images/Allergens/Group-7.png'),
    selected: false,
    category: 'Others',
  },
  {
    name: 'Gluten',
    src: require('../../assets/images/Allergens/Group-8.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Soya',
    src: require('../../assets/images/Allergens/Group-9.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Mushroom',
    src: require('../../assets/images/Allergens/Group-10.png'),
    selected: false,
    category: 'Mushroom',
  },
  {
    name: 'Mustard',
    src: require('../../assets/images/Allergens/Group-11.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Celery',
    src: require('../../assets/images/Allergens/Group-12.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Sulphites',
    src: require('../../assets/images/Allergens/Group-13.png'),
    selected: false,
    category: 'Others',
  },
  {
    name: 'Lupin',
    src: require('../../assets/images/Allergens/Group-14.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Lupin',
    src: require('../../assets/images/Allergens/Group-14.png'),
    selected: false,
    category: 'NutsVeg',
  },
  {
    name: 'Lupin',
    src: require('../../assets/images/Allergens/Group-14.png'),
    selected: false,
    category: 'NutsVeg',
  },
  
  
];
export default function SelectAllergies() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'All', value: 'all'},
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  let [searchResults, setSearchResults]: any[] = useState([]);
  const [searchText, setSearchText]: any = useState(null);
  let [allergenList, setAllergenList]: any = React.useState(AllergenArr);
  const [visible_1, setVisible_1] = React.useState(false);
  const [visible_2, setVisible_2] = React.useState(false);

  const showModal_1 = () => setVisible_1(true);
  const hideModal_1 = () => setVisible_1(false);
  const showModal_2 = () => setVisible_2(true);
  const hideModal_2 = () => setVisible_2(false);

  const [submitBool, setSubmitBool] = useState(false);
  const containerStyle = {
    backgroundColor: '#f3f4f6',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    gap: 20,
  };
  const filterTab = (cat: any) => {
    var arr = AllergenArr.filter(item => {
      if (item.category === cat) {
        return item;
      }
    });
    setAllergenList(arr);
  };
  React.useEffect(() => {
    if (searchText) {
      var res = allergenList.filter(
        (item: any) =>
          item.name.toLowerCase().search(searchText?.toLowerCase()) !== -1,
      );
      setSearchResults(res);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);
  React.useEffect(() => {
    if (route.params.currentItem) {
      route.params.currentItem.allergy.map((item: any) => {
        allergenList.map((data: any, index: number) => {
          if (item.name === data.name) {
            allergenList[index].selected = true;
          }
        });
      });

      console.log(allergenList);
      setAllergenList(allergenList);
    } else {
      allergenList.map((item: any) => (item.selected = false));
      setAllergenList(allergenList);
    }
  }, [route.params.currentItem]);
  return (
    <View className="flex flex-col bg-gray-50 relative flex-grow justify-between">
      {/* <AddAllergy
      /> */}
      {submitBool ? (
        <View className="w-full p-6 flex flex-col">
          <Text className="text-lg text-gray-800 font-semibold">
            Student Allergies Details:
          </Text>
          <View
            style={{elevation: 5}}
            className="px-2 pb-6 pt-2 bg-white gap-2 my-5 rounded-xl">
            <View className="flex flex-row justify-between">
              <Text className="text-lg text-gray-800 font-semibold">
                Gary Smith - Class A
              </Text>
              <MaterialCommunityIcons name="dots-vertical" size={24} />
            </View>
            <Text>Allergies</Text>
            <Text className="text-gray-700 font-[500]">
              Shellfish, Nuts, Eggs
            </Text>
            <View className="flex flex-row pb-2">
              <Text>Note: </Text>
              <Text className="text-gray-700 font-[500]">
                Porridge only & no rice
              </Text>
            </View>
            <Text>26 Feb 2023, 2:45PM</Text>
          </View>
          <View className="flex flex-grow justify-center items-center ">
            <TouchableOpacity
              onPress={() => setSubmitBool(false)}
              className="bg-gray-200 px-8 py-1 rounded-full justify-center">
              <Text className="text-blue-900 text-[16px] font-semibold">
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View
            style={{elevation: 3}}
            className="bg-white m-2 rounded-2xl px-5 h-10 flex flex-row items-center">
            <MaterialIcons name="search" size={20} className="" />
            <TextInput
              onChangeText={text => {
                setSearchText(text);
              }}
              className="flex flex-grow"
              placeholder="Search"
            />
          </View>
          {searchResults.length > 0 ? (
            <View
              style={{
                borderWidth: 1,
              }}
              className="bg-white border-gray-300">
              <ScrollView horizontal={true} contentContainerStyle={{}}>
                {searchResults.map((item: any, index: number) => (
                  <View key={index} className=" p-2">
                    <View className="h-[56px] flex justify-center items-center">
                      <Image source={item.src} />
                    </View>
                    <Text className="font-[500] text-gray-800">
                      {item.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
          <View className="bg-white justify-start h-[83%] px-5">
            <DropDownPicker
              labelStyle={{
                fontWeight: '500',
              }}
              containerStyle={{
                borderWidth: 0,
                width: 70,
                borderColor: '#fff',
              }}
              dropDownContainerStyle={{
                borderWidth: 0,
              }}
              zIndex={1000}
              style={{
                borderWidth: 0,
                width: 70,
              }}
              placeholder={items[0].label}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            {/* <TouchableOpacity className="absolute right-0" onPress={showModal_1}>
  <Text>Show</Text> 
 </TouchableOpacity> */}
            <View className="h-[40px]">
              <ScrollView
                horizontal={true}
                className="border flex flex-row rounded-full px-1  border-gray-400 overflow-hidden">
                <TouchableOpacity
                  onPress={() => {
                    filterTab('Shellfish');
                  }}
                  className="p-2 border-r border-gray-400">
                  <Text className="text-black">Shellfish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    filterTab('Mushroom');
                  }}
                  className="p-2 border-r border-gray-400">
                  <Text className="text-black">Mushroom</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    filterTab('NutsVeg');
                  }}
                  className="p-2 border-r border-gray-400">
                  <Text className="text-black">Nuts & Veg</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    filterTab('Animal');
                  }}
                  className="p-2 border-r border-gray-400">
                  <Text className="text-black">Animal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    filterTab('Others');
                  }}
                  className="p-2">
                  <Text className="text-black">Others</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            {/* <FlatList  
 className='border'
 contentContainerStyle={{
  display: 'flex',
  justifyContent: 'space-between'
 }}
  numColumns={3}
  data={allergenList}
  renderItem={({item, index, separators}) => (
    <TouchableOpacity
    onPress={()=>{
     setAllergenList((prev: any) => {
       prev[index].selected = !prev[index].selected;
       return [...prev];
     });
    }}
      key={index}
      className="mx-3 mb-3 w-[64px] flex justify-center items-center relative">
       <View className={`rounded-full absolute top-0 right-0 z-10 ${item.selected ? 'block' : 'hidden'}`}>
         <Ionicons
       name='checkmark-circle'
       color={'green'}
       size={20}
       /></View>
      <View className="bg-gray-300 p-2 rounded-full h-[64px] w-[64px] flex justify-center items-center">
        <Image source={item.src} />
      </View>
      <View className="flex justify-center items-center w-[94px]">
        <Text className=" text-gray-600 font-semibold mx-auto px-2">
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )}
/> */}
            <View className="pt-6 h-[78%]" style={{}}>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  padding: 3,
                }}
                //className="flex flex-row justify-between items-center flex-wrap p-3 "
              >
                {allergenList.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setAllergenList((prev: any) => {
                          prev[index].selected = !prev[index].selected;
                          return [...prev];
                        });
                      }}
                      key={index}
                      className="mx-4 mb-3 w-[64px] flex justify-center items-center relative">
                      <View
                        className={`rounded-full absolute top-0 right-0 z-10 ${
                          item.selected ? 'block' : 'hidden'
                        }`}>
                        <Ionicons
                          name="checkmark-circle"
                          color={'green'}
                          size={20}
                        />
                      </View>
                      <View className="bg-gray-300 p-2 rounded-full h-[64px] w-[64px] flex justify-center items-center">
                        <Image source={item.src} />
                      </View>
                      <View className="flex justify-center items-center w-[94px]">
                        <Text className=" text-gray-600 font-semibold mx-auto px-2">
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {/* <Modal_1
  visible={visible_1}
  hideModal={hideModal_1}
  containerStyle={containerStyle}
  showModal={showModal_2}
  />
  <Modal_2
  visible={visible_2}
  hideModal={hideModal_2}
  prevModal={showModal_1}
  containerStyle={containerStyle}
  setSubmitBool={setSubmitBool}
  />  */}
              </ScrollView>
            </View>
          </View>
        </>
      )}
      <View className=" bg-white px-16 py-4">
        <TouchableOpacity
          onPress={() => {
            var arr: any[] = [];
            allergenList.map((item: any) => {
              if (item.selected) {
                arr.push(item);
              }
            });
            console.log(arr, route.params.stdArr);
            navigation.navigate('AddAllergy', {
              allergens: arr,
              currentItem: route.params.currentItem,
              stdArr: route.params.stdArr,
            });
          }}
          className="flex-row items-center py-2.5 bg-blue-900 justify-center rounded-lg border">
          <Text className=" text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
