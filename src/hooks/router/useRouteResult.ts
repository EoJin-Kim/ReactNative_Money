import { useEffect } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, ScreenResultProp } from '@/navigation/NavigationTypes';

/**
 * 화면 간 결과 전달을 받는 훅
 * 자식 화면에서 전달한 결과를 자동으로 수신합니다.
 */
export function useRouteResult<T extends object = object>(
  callback: (result: ScreenResultProp<keyof RootStackParamList, T>) => void
) {
  const route = useRoute<RouteProp<RootStackParamList>>();

  useEffect(() => {
    const params = route.params as any;
    if (params?.screenType && params?.data) {
      callback(params as ScreenResultProp<keyof RootStackParamList, T>);
    }
  }, [route.params, callback]);
}

