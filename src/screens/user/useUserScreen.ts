import { useCallback } from 'react';
import { Router } from '@/navigation/Router';
import { MENU } from '@/navigation/NavigationTypes';
import { useUsers } from '@/hooks/api/useUserApi';

/**
 * UserScreen 커스텀 훅
 * 사용자 목록 화면의 비즈니스 로직을 관리합니다.
 */
export function useUserScreen() {
  const { data: users, isLoading, error } = useUsers();

  const handleNavigateToProfile = useCallback((userId: string) => {
    Router.moveToMenu(MENU.USER.PROFILE, { userId });
  }, []);

  return {
    data: {
      users,
      isLoading,
      error,
    },
    handlers: {
      handleNavigateToProfile,
    },
  };
}

