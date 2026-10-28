import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthScreen } from './useAuthScreen';

export default function AuthScreen() {
  const { handlers } = useAuthScreen();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="font24b mb-8 text-gray-900">인증 화면</Text>
      
      <TouchableOpacity
        onPress={handlers.handleNavigateToLogin}
        className="h-14 w-full items-center justify-center rounded-lg bg-blue-500"
      >
        <Text className="text-white font16sb">로그인으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}

