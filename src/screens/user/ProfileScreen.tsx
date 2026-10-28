import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useProfileScreen } from './useProfileScreen';

export default function ProfileScreen() {
  const { data, handlers } = useProfileScreen();
  const { user, isLoading } = data;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="font16m text-gray-600">로딩 중...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="font24b mb-8 text-gray-900">프로필</Text>
      
      {user && (
        <View className="mb-6">
          <Text className="font16sb text-gray-900">이름: {user.name}</Text>
          <Text className="font14m text-gray-600 mt-2">이메일: {user.email}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handlers.handleGoBack}
        className="h-14 w-full items-center justify-center rounded-lg bg-gray-500"
      >
        <Text className="text-white font16sb">뒤로가기</Text>
      </TouchableOpacity>
    </View>
  );
}

