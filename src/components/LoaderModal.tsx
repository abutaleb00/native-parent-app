import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'

export default function LoaderModal() {
  return (
    <View className='absolute bg-white top-0 right-0 flex justify-center items-center w-full h-full'>
      <ActivityIndicator
      size={30}
      color={'orange'}
      />
    </View>
  )
}