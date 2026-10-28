import { useState, useCallback } from 'react';
import { Router } from '@/navigation/Router';
import { MENU } from '@/navigation/NavigationTypes';
import { useLogin } from '@/hooks/api/useAuthApi';
import { useToast } from '@/providers/ToastProvider';

/**
 * LoginScreen 커스텀 훅
 * 로그인 화면의 비즈니스 로직을 관리합니다.
 */
export function useLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const { showToast } = useToast();

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      showToast('이메일과 비밀번호를 입력해주세요.', 'error');
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      showToast('로그인 성공!', 'success');
      Router.moveToMenu(MENU.MAIN.INDEX);
    } catch (error) {
      showToast('로그인에 실패했습니다.', 'error');
    }
  }, [email, password, loginMutation, showToast]);

  return {
    data: {
      email,
      password,
      isLoading: loginMutation.isPending,
    },
    handlers: {
      setEmail,
      setPassword,
      handleLogin,
    },
  };
}

