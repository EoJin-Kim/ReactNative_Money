import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useHomeScreen } from './useHomeScreen';

export default function HomeScreen() {
  const { handlers } = useHomeScreen();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="font24b mb-8 text-gray-900">홈 화면</Text>
      
      <TouchableOpacity
        onPress={handlers.handleGoBack}
        className="h-14 w-full items-center justify-center rounded-lg bg-gray-500"
      >
        <Text className="text-white font16sb">뒤로가기</Text>
      </TouchableOpacity>
    </View>
  );
}

