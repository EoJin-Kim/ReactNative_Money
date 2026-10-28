import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
}

/**
 * 커스텀 TextInput 컴포넌트
 */
export function TextInput({ error, className, ...props }: CustomTextInputProps) {
  return (
    <RNTextInput
      {...props}
      className={`h-14 rounded-lg border bg-white px-4 font14m ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className || ''}`}
    />
  );
}

