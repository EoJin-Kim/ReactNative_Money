/**
 * 네비게이션 타입 정의
 * 모든 라우트 경로와 파라미터를 중앙에서 관리합니다.
 */

// 라우트 경로 상수
export const MENU = {
  INTRO: {
    INDEX: '/intro',
    LOGIN: '/intro/login',
  },
  
  PASSWORD: {
    REGISTER: '/password/register',
  },
  MAIN: {
    INDEX: '/main',
    HOME: '/main/home',
  },
  AUTH: {
    INDEX: '/auth',
    LOGIN: '/auth/login',
  },
  NOTICE: {
    INDEX: '/notice',
  },
  RECEIPT: {
    INDEX: '/receipt',
  },
  SAMPLE: {
    INDEX: '/sample',
  },
} as const;

// 라우트 파라미터 타입 정의
export type RootStackParamList = {
  [MENU.INTRO.INDEX]: undefined;
  [MENU.INTRO.LOGIN]: undefined;
  [MENU.PASSWORD.REGISTER]: {
    accessToken: string;
    refreshToken: string;
  };
  [MENU.MAIN.INDEX]: undefined;
  [MENU.MAIN.HOME]: undefined;
  [MENU.AUTH.INDEX]: undefined;
  [MENU.AUTH.LOGIN]: undefined;
  [MENU.NOTICE.INDEX]: undefined;
  [MENU.RECEIPT.INDEX]: undefined;
  [MENU.SAMPLE.INDEX]: undefined;
};

// 화면 간 결과 전달 타입
export interface ScreenResultProp<
  T extends keyof RootStackParamList = keyof RootStackParamList,
  D extends object = object,
> {
  screenType: T;
  data: D;
}

// 딥링크 이동제외 화면
export const EXCLUDED_SCREENS: string[] = [MENU.INTRO.INDEX]

// 탭 레이아웃 리스트
export const TAB_SCREENS: string[] = [MENU.MAIN.HOME]
