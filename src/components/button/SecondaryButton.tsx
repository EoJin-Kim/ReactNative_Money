import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface SecondaryButtonProps extends TouchableOpacityProps {
  label: string;
}

/**
 * Secondary 버튼 컴포넌트
 */
export function SecondaryButton({ label, ...props }: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className="h-14 items-center justify-center rounded-lg border border-gray-300 bg-white disabled:bg-gray-100"
    >
      <Text className="text-gray-900 font16sb">{label}</Text>
    </TouchableOpacity>
  );
}

