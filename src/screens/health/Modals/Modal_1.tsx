import React from 'react'
import {Portal,Modal} from 'react-native-paper'
import {Text,TouchableOpacity,View,Image,TextInput} from 'react-native'
type Props = {}

const Modal_1 = (props: any) => {
  return (
    <Portal>
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      contentContainerStyle={props.containerStyle}>
        <View className='gap-2'>
      <Text className="text-lg font-semibold text-gray-700">
        My Allergens
      </Text>
      <Text className="text-[12px] font-semibold text-gray-700">
        Select multiple categories you're preparing for
      </Text></View>
      <View className="flex flex-row justify-between pb-7">
        <View className="bg-gray-300 p-2 rounded-full h-[64px] w-[64px] flex items-center justify-center relative">
          <Image
            source={require('../../../assets/images/Allergens/Group-3.png')}
          />
          <View className='absolute -bottom-6 w-[70px] flex items-center'>
          <Text className=" text-gray-600 font-semibold">
            Seashell
          </Text></View>
        </View>
        <View className="bg-gray-300 p-2 rounded-full h-[64px] w-[64px] flex items-center justify-center relative">
          <Image
            source={require('../../../assets/images/Allergens/Group-4.png')}
          />
          <View className='absolute -bottom-6 w-[70px] flex items-center'>
          <Text className=" text-gray-600 font-semibold">
            Nuts
          </Text></View>
        </View>
        <View className="bg-gray-300 p-2 rounded-full h-[64px] w-[64px] flex items-center justify-center relative">
          <Image
            source={require('../../../assets/images/Allergens/Group-5.png')}
          />
          <View className='absolute -bottom-6 w-[70px] flex items-center'>
          <Text className=" text-gray-600 font-semibold">
            Peanuts
          </Text></View>
        </View>
      </View>
      <View className='gap-2'>
      <Text className="text-lg font-semibold text-gray-600">
        Add Note
      </Text>
      <TextInput className="p-2 border border-gray-400 rounded-xl h-[64px]" /></View>
      <View className="flex flex-row justify-center gap-5">
        <TouchableOpacity onPress={()=>props.hideModal()} className="bg-white px-8 py-1 rounded-full justify-center border border-gray-400"><Text className='text-blue-900 text-[16px] font-semibold'>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{props.hideModal();props.showModal()}} className="bg-gray-200 px-8 py-1 rounded-full justify-center"><Text className='text-blue-900 text-[16px] font-semibold'>Next</Text></TouchableOpacity>
      </View>
    </Modal>
  </Portal>
  )
}

export default Modal_1