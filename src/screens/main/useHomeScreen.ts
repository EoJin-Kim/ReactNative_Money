import { useCallback } from 'react';
import { Router } from '@/navigation/Router';

/**
 * HomeScreen 커스텀 훅
 * 홈 화면의 비즈니스 로직을 관리합니다.
 */
export function useHomeScreen() {
  const handleGoBack = useCallback(() => {
    Router.pop();
  }, []);

  return {
    handlers: {
      handleGoBack,
    },
  };
}

