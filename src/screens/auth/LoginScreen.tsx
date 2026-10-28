import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useLoginScreen } from './useLoginScreen';

export default function LoginScreen() {
  const { data, handlers } = useLoginScreen();
  const { email, password, isLoading } = data;

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="font24b mb-8 text-gray-900">로그인</Text>
      
      <TextInput
        value={email}
        onChangeText={handlers.setEmail}
        placeholder="이메일"
        keyboardType="email-address"
        autoCapitalize="none"
        className="mb-4 h-14 rounded-lg border border-gray-300 bg-white px-4 font14m"
      />
      
      <TextInput
        value={password}
        onChangeText={handlers.setPassword}
        placeholder="비밀번호"
        secureTextEntry
        className="mb-6 h-14 rounded-lg border border-gray-300 bg-white px-4 font14m"
      />

      <TouchableOpacity
        onPress={handlers.handleLogin}
        disabled={isLoading}
        className="h-14 w-full items-center justify-center rounded-lg bg-blue-500"
      >
        <Text className="text-white font16sb">
          {isLoading ? '로그인 중...' : '로그인'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

