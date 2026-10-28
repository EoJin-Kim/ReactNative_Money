import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useUserScreen } from './useUserScreen';

export default function UserScreen() {
  const { data, handlers } = useUserScreen();
  const { users, isLoading, error } = data;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="font16m text-gray-600">로딩 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="font16m text-red-500">에러가 발생했습니다.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-500 px-6 py-4">
        <Text className="font24b text-white">사용자 목록</Text>
      </View>
      
      <ScrollView className="flex-1 p-6">
        {users?.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={() => handlers.handleNavigateToProfile(user.id)}
            className="mb-4 rounded-lg border border-gray-200 bg-white p-4"
          >
            <Text className="font16sb text-gray-900">{user.name}</Text>
            <Text className="font14m text-gray-600">{user.email}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

