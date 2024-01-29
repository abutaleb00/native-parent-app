import React from 'react'
import {Portal,Modal} from 'react-native-paper'
import {Text,TouchableOpacity,View,Image,TextInput, ScrollView} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
type Props = {}

const Modal_2 = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
      {label: 'All', value: 'all'},
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ]);
  return (
    <Portal>
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      contentContainerStyle={props.containerStyle}>
        <View className='gap-2'>
      <Text className="text-lg font-semibold text-gray-700">
        Select Class
      </Text>
      <Text className="text-[12px] font-semibold text-gray-700">
        Select multiple categories you're preparing for
      </Text></View>
      <View className="flex flex-row justify-between pb-7">
        <View className=" rounded-full h-[64px] w-[64px] flex justify-center relative">
          <Image
            source={require('../../../assets/images/Allergens/Group-15.png')}
          />
          <Text className="absolute -bottom-6 text-gray-600 font-semibold left-1 px-2">
            Class A
          </Text>
        </View>
        <View className=" rounded-full h-[64px] w-[64px] flex justify-center relative">
          <Image
            source={require('../../../assets/images/Allergens/Group-16.png')}
          />
          <Text className="absolute -bottom-6 text-gray-600 font-semibold left-1 px-2">
            Class B
          </Text>
        </View>
        <View className=" rounded-full h-[64px] w-[64px] flex justify-center relative">
          <Image
            source={require('../../../assets/images/Allergens/Group-17.png')}
          />
          <Text className="absolute -bottom-6 text-gray-600 font-semibold left-1 px-2">
            Class C
          </Text>
        </View>
      </View>
      <View className='gap-2'>
      <Text className="text-lg font-semibold text-gray-600">
        Student Name
      </Text>
      <View className="overflow-hidden border border-gray-400 bg-white rounded-xl h-[200px]" >
      <DropDownPicker
          labelStyle={{
            fontWeight: '500',
          }}
         
          selectedItemContainerStyle={{
            backgroundColor: "#e5e7eb",
            
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
          }}
          zIndex={1000}
          style={{
            borderWidth: 0,
            width: '100%',
          }}
          placeholder={"Select"}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        </View></View>
      <View className="flex flex-row justify-center gap-5">
        <TouchableOpacity onPress={()=>{props.hideModal();props.prevModal()}} className="bg-white px-8 py-1 rounded-full justify-center border border-gray-400"><Text className='text-blue-900 text-[16px] font-semibold'>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{props.hideModal();props.setSubmitBool(true)}} className="bg-gray-200 px-8 py-1 rounded-full justify-center"><Text className='text-blue-900 text-[16px] font-semibold'>Submit</Text></TouchableOpacity>
      </View>
    </Modal>
  </Portal>
  )
}

export default Modal_2