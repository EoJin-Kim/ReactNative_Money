import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

/**
 * 카드 컴포넌트
 */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      {...props}
      className={`rounded-lg border border-gray-200 bg-white p-4 ${className || ''}`}
    >
      {children}
    </View>
  );
}

