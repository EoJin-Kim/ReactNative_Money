import { useCallback } from 'react';
import { Router } from '@/navigation/Router';
import { MENU } from '@/navigation/NavigationTypes';

/**
 * AuthScreen 커스텀 훅
 * 인증 화면의 비즈니스 로직을 관리합니다.
 */
export function useAuthScreen() {
  const handleNavigateToLogin = useCallback(() => {
    Router.moveToMenu(MENU.AUTH.LOGIN);
  }, []);

  return {
    handlers: {
      handleNavigateToLogin,
    },
  };
}

