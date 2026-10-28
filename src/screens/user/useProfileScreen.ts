import { useCallback } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, MENU } from '@/navigation/NavigationTypes';
import { Router } from '@/navigation/Router';
import { useUser } from '@/hooks/api/useUserApi';

/**
 * ProfileScreen 커스텀 훅
 * 사용자 프로필 화면의 비즈니스 로직을 관리합니다.
 */
export function useProfileScreen() {
  const route = useRoute<RouteProp<RootStackParamList, typeof MENU.USER.PROFILE>>();
  const userId = route.params?.userId || '1';
  const { data: user, isLoading } = useUser(userId);

  const handleGoBack = useCallback(() => {
    Router.pop();
  }, []);

  return {
    data: {
      user,
      isLoading,
      userId,
    },
    handlers: {
      handleGoBack,
    },
  };
}

