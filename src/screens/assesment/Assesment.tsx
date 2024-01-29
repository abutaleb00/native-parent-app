import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Assesment = (props: any) => {
    
  return (
    <View style={{elevation:3}} className='w-full bg-white shadow-md border border-gray-200 mb-4 py-4 px-2 rounded-xl'>
      <Text className='text-blue-900 text-lg font-semibold'>{props.date_}</Text>
      <Text className='text-blue-900 font-semibold mb-1'>{props.type}</Text>
      <View className='flex-row flex-grow'><Text className='w-[80%]'>{props.desc}</Text>
      <View className='flex justify-center items-center flex-grow'>
      <Ionicons
      
      name={props.starred?"star":"star-outline"}
      color="#facc15"
      size={50}
      />
      </View>
     </View>
      
    </View>
  )
}

export default Assesment

